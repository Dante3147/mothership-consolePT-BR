import { usePlayers } from "@/lib/context/player-context";
import { Credit } from "@/lib/models/credit";
import React, { useState } from "react";

export function AddPlayerForm() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerCredits, setNewPlayerCredits] = useState("");
  const { addPlayer } = usePlayers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const credits = parseInt(newPlayerCredits) || 0;
    addPlayer(newPlayerName, new Credit(credits));
    setNewPlayerName("");
    setNewPlayerCredits("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-primary/80 px-4 py-2 bg-black"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-primary">PLAYER</span>
          <input
            type="text"
            placeholder="ENTER PLAYER NAME"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="flex-1 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary">CR</span>
          <input
            type="number"
            placeholder="ENTER CREDITS"
            value={newPlayerCredits}
            onChange={(e) => setNewPlayerCredits(e.target.value)}
            className="flex-1 bg-black border border-primary/30 text-white focus:outline-none focus:border-primary px-2 py-1 font-mono text-sm"
            required
          />
          <button
            type="submit"
            className="bg-primary/20 text-primary border border-primary px-3 py-1 font-mono text-sm hover:bg-primary/30 transition-colors"
          >
            [ADD]
          </button>
        </div>
      </div>
    </form>
  );
}
