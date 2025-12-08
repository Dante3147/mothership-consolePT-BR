import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useTransactions } from "@/lib/context/transaction-context";
import { Credit } from "@/lib/models/credit";
import { PeriodicPayment } from "@/lib/models/periodic-payment";
import { PeriodicPaymentRecord } from "@/lib/models/periodic-payment-record";
import { Duration } from "luxon";
import React from "react";

interface PeriodicPaymentDialogProps {
  playerId?: string;
  playerName?: string;
  forAllPlayers?: boolean;
  onClose: () => void;
}

export function PeriodicPaymentDialog({
  playerId,
  playerName,
  forAllPlayers = false,
  onClose,
}: PeriodicPaymentDialogProps) {
  const { addPeriodicPayment } = useTransactions();
  const { currentTime } = useSimulationTime();
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [period, setPeriod] = React.useState("1");
  const [periodUnit, setPeriodUnit] = React.useState<
    "hours" | "days" | "weeks" | "months" | "years"
  >("days");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(amount) || 0;
    const payment = new PeriodicPayment(
      new Credit(value),
      Duration.fromObject({ [periodUnit]: parseInt(period) })
    );

    if (forAllPlayers) {
      // This will be handled by the parent component
      onClose();
      return;
    }

    if (playerId) {
      await addPeriodicPayment(
        new PeriodicPaymentRecord(
          "temp-id",
          playerId,
          name,
          payment,
          currentTime,
          null
        )
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black border border-primary p-4 w-96">
        <h2 className="text-white text-lg mb-4">
          {forAllPlayers
            ? "Add Recurring Payment for All Players"
            : "Add Recurring Payment"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {!forAllPlayers && playerName && (
              <label className="block text-white text-sm mb-2">
                Player: {playerName}
              </label>
            )}
            {forAllPlayers && (
              <label className="block text-white text-sm mb-2">
                This will create equal payments for all players
              </label>
            )}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Payment name"
              className="w-full bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm mb-2"
              autoFocus
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={
                forAllPlayers ? "Total amount (will be split)" : "Amount"
              }
              className="w-full bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm mb-2"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Period"
                className="w-1/2 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
              />
              <select
                value={periodUnit}
                onChange={(e) => setPeriodUnit(e.target.value as any)}
                className="w-1/2 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-primary/20 text-primary border border-primary px-3 py-1 font-mono text-sm hover:bg-primary/30 transition-colors"
            >
              [CANCEL]
            </button>
            <button
              type="submit"
              className="bg-primary/20 text-primary border border-primary px-3 py-1 font-mono text-sm hover:bg-primary/30 transition-colors"
            >
              [CONFIRM]
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
