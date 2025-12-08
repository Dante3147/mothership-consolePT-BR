import { Credit } from "@/lib/models/credit";
import { PeriodicPayment } from "@/lib/models/periodic-payment";
import { Duration } from "luxon";
import React, { useState } from "react";

interface PeriodicPaymentFormProps {
  onAddPayment: (payment: PeriodicPayment, name: string) => void;
  onCancel: () => void;
}

export function PeriodicPaymentForm({
  onAddPayment,
  onCancel,
}: PeriodicPaymentFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("1");
  const [periodUnit, setPeriodUnit] = useState<
    "hours" | "days" | "weeks" | "months" | "years"
  >("days");

  const handleAddPayment = () => {
    if (!name || !amount || !period) return;

    const payment = new PeriodicPayment(
      new Credit(parseInt(amount)),
      Duration.fromObject({ [periodUnit]: parseInt(period) })
    );

    onAddPayment(payment, name);
    onCancel(); // Close the form after adding payment
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddPayment();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div className="mt-2 p-2 border border-primary/30 bg-black">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="PAYMENT NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-48 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
        />
        <input
          type="number"
          placeholder="AMOUNT"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-24 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
        />
        <input
          type="number"
          placeholder="PERIOD"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-24 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
        />
        <select
          value={periodUnit}
          onChange={(e) => setPeriodUnit(e.target.value as any)}
          onKeyDown={handleKeyPress}
          className="w-24 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
        >
          <option value="hours">HOURS</option>
          <option value="days">DAYS</option>
          <option value="weeks">WEEKS</option>
          <option value="months">MONTHS</option>
          <option value="years">YEARS</option>
        </select>
        <button
          onClick={handleAddPayment}
          className="bg-primary/20 text-primary border border-primary px-3 py-1 font-mono text-sm hover:bg-primary/30 transition-colors"
        >
          [ADD]
        </button>
        <button
          onClick={onCancel}
          className="bg-primary/20 text-primary border border-primary px-3 py-1 font-mono text-sm hover:bg-primary/30 transition-colors"
        >
          [CANCEL]
        </button>
      </div>
    </div>
  );
}
