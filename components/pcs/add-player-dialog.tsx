import { usePlayers } from "@/lib/context/player-context";
import { Credit } from "@/lib/models/credit";
import React from "react";

interface AddPlayerDialogProps {
  onClose: () => void;
}

export function AddPlayerDialog({ onClose }: AddPlayerDialogProps) {
  const { addPlayer } = usePlayers();
  const [name, setName] = React.useState("");
  const [credits, setCredits] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const creditValue = parseInt(credits) || 0;
    addPlayer(name, new Credit(creditValue));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black border border-primary p-4 w-96">
        <h2 className="text-white text-lg mb-4">Add Player</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Player name"
              className="w-full bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm mb-2"
              autoFocus
              required
            />
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Starting credits"
              className="w-full bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
              required
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
