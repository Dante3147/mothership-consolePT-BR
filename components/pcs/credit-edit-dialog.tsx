import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useTransactions } from "@/lib/context/transaction-context";
import { Credit } from "@/lib/models/credit";
import React from "react";

interface CreditEditDialogProps {
  playerId: string;
  playerName: string;
  onClose: () => void;
  mode: "add" | "remove" | "set";
}

export function CreditEditDialog({
  playerId,
  playerName,
  onClose,
  mode,
}: CreditEditDialogProps) {
  const { addTransaction } = useTransactions();
  const { currentTime } = useSimulationTime();
  const { getPlayerBalance } = useTransactions();
  const [amount, setAmount] = React.useState("");
  const currentBalance = getPlayerBalance(playerId, currentTime);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(amount) || 0;

    if (mode === "set") {
      const difference = value - currentBalance;
      await addTransaction(playerId, new Credit(difference));
    } else {
      await addTransaction(
        playerId,
        new Credit(mode === "add" ? value : -value)
      );
    }
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-black border border-primary p-4 w-96"
        onKeyDown={handleKeyPress}
      >
        <h2 className="text-white text-lg mb-4">
          {mode === "add"
            ? "Add Credits"
            : mode === "remove"
            ? "Remove Credits"
            : "Set Credits"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">
              Player: {playerName}
            </label>
            {mode === "set" && (
              <label className="block text-white text-sm mb-2">
                Current Balance: {new Credit(currentBalance).toString()}
              </label>
            )}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
              autoFocus
            />
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
