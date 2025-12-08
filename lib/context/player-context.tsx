"use client";

import { PlayerRepository } from "@/lib/data/player-repository";
import { Player } from "@/lib/models/player";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Credit } from "../models/credit";
import { useTransactions } from "./transaction-context";

interface PlayerContextType {
  players: Player[];
  addPlayer: (name: string, credits: Credit) => Promise<void>;
  removePlayer: (id: string) => Promise<void>;
  updatePlayer: (player: Player) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const { addTransaction, removeTransactionsForPlayer } = useTransactions();
  const repository = new PlayerRepository();

  // Load players from Firebase on mount
  useEffect(() => {
    const loadPlayers = async () => {
      const loadedPlayers = await repository.getAll();
      setPlayers(loadedPlayers);
    };
    loadPlayers();
  }, []);

  const addPlayer = async (name: string, credits: Credit) => {
    const newPlayer = new Player(`player-${name}-${Date.now()}`, name);
    await repository.add(newPlayer);
    await addTransaction(newPlayer.id, credits);
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const removePlayer = async (id: string) => {
    await repository.remove(id);
    await removeTransactionsForPlayer(id);
    setPlayers((prev) => prev.filter((player) => player.id !== id));
  };

  const updatePlayer = async (player: Player) => {
    await repository.update(player);
    setPlayers((prev) => prev.map((p) => (p.id === player.id ? player : p)));
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        updatePlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayers() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayerProvider");
  }
  return context;
}
