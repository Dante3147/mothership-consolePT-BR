import { useEditing } from "@/lib/context/editing-context";
import { usePlayers } from "@/lib/context/player-context";
import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useTransactions } from "@/lib/context/transaction-context";
import { Credit } from "@/lib/models/credit";
import { PeriodicPayment } from "@/lib/models/periodic-payment";
import { PeriodicPaymentRecord } from "@/lib/models/periodic-payment-record";
import { Duration } from "luxon";
import React from "react";

interface TotalCreditsProps {
  totalCredits: number;
}

export function TotalCredits({ totalCredits }: TotalCreditsProps) {
  const {
    isEditingTotal,
    editingAmount,
    isAdding,
    startEditing,
    cancelEditing,
    setEditingAmount,
  } = useEditing();

  const { players } = usePlayers();
  const { addTransaction, addPeriodicPayment } = useTransactions();
  const { currentTime } = useSimulationTime();
  const [showRecurringDialog, setShowRecurringDialog] = React.useState(false);

  const handleAddToTotal = async () => {
    const amount = parseInt(editingAmount) || 0;
    if (players.length > 0) {
      const amountPerPlayer = Math.floor(amount / players.length);
      const remainder = amount % players.length;

      players.forEach(async (player, index) => {
        const extra = index < remainder ? 1 : 0;
        await addTransaction(player.id, new Credit(amountPerPlayer + extra));
      });
    }
    cancelEditing();
  };

  const handleRemoveFromTotal = async () => {
    const amount = parseInt(editingAmount) || 0;
    if (players.length > 0) {
      const amountPerPlayer = Math.floor(amount / players.length);
      const remainder = amount % players.length;

      players.forEach(async (player, index) => {
        const extra = index < remainder ? 1 : 0;
        await addTransaction(player.id, new Credit(-(amountPerPlayer + extra)));
      });
    }
    cancelEditing();
  };

  const handleRecurringPayment = async (
    name: string,
    amount: number,
    period: number,
    periodUnit: string
  ) => {
    if (players.length > 0) {
      const amountPerPlayer = Math.floor(amount / players.length);
      const remainder = amount % players.length;

      players.forEach(async (player, index) => {
        const extra = index < remainder ? 1 : 0;
        const playerAmount = amountPerPlayer + extra;
        const playerPayment = new PeriodicPayment(
          new Credit(playerAmount),
          Duration.fromObject({ [periodUnit]: period })
        );

        const paymentRecord = new PeriodicPaymentRecord(
          "temp-id",
          player.id,
          name,
          playerPayment,
          currentTime,
          null
        );

        await addPeriodicPayment(paymentRecord);
      });
    }
    setShowRecurringDialog(false);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isAdding) {
        await handleAddToTotal();
      } else {
        await handleRemoveFromTotal();
      }
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  return (
    <div className="border-t border-primary/80 px-4 py-2 bg-primary/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="text-l text-white">TOTAL</div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div
            className={`text-l font-semibold ${
              totalCredits < 0 ? "text-red-400" : "text-white"
            }`}
          >
            {new Credit(totalCredits).toString()}
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {isEditingTotal ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="number"
                  placeholder="ENTER AMOUNT"
                  value={editingAmount}
                  onChange={(e) => setEditingAmount(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full sm:w-32 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
                  autoFocus
                />
                <button
                  onClick={() =>
                    isAdding ? handleAddToTotal() : handleRemoveFromTotal()
                  }
                  className="bg-primary/20 text-primary border border-primary px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm hover:bg-primary/30 transition-colors"
                >
                  [CONFIRM]
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-primary/20 text-primary border border-primary px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm hover:bg-primary/30 transition-colors"
                >
                  [CANCEL]
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => startEditing(null, "remove")}
                  className="bg-primary/20 text-primary border border-primary px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm hover:bg-primary/30 transition-colors"
                >
                  [REMOVE]
                </button>
                <button
                  onClick={() => startEditing(null, "add")}
                  className="bg-primary/20 text-primary border border-primary px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm hover:bg-primary/30 transition-colors"
                >
                  [ADD]
                </button>
                <button
                  onClick={() => setShowRecurringDialog(true)}
                  className="bg-primary/20 text-primary border border-primary px-2 sm:px-3 py-1 font-mono text-xs sm:text-sm hover:bg-primary/30 transition-colors"
                >
                  [RECURRING]
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showRecurringDialog && (
        <RecurringPaymentDialog
          forAllPlayers={true}
          onClose={() => setShowRecurringDialog(false)}
          onSubmit={handleRecurringPayment}
        />
      )}
    </div>
  );
}

interface RecurringPaymentDialogProps {
  forAllPlayers: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    amount: number,
    period: number,
    periodUnit: string
  ) => void;
}

function RecurringPaymentDialog({
  onClose,
  onSubmit,
}: RecurringPaymentDialogProps) {
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [period, setPeriod] = React.useState("1");
  const [periodUnit, setPeriodUnit] = React.useState<
    "hours" | "days" | "weeks" | "months" | "years"
  >("days");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(amount) || 0;
    const periodValue = parseInt(period) || 1;

    onSubmit(name, value, periodValue, periodUnit);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black border border-primary p-4 w-96">
        <h2 className="text-white text-lg mb-4">
          Add Recurring Payment for All Players
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              This will create equal payments for all players
            </label>
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
              placeholder="Total amount (will be split)"
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
