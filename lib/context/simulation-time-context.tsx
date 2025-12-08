"use client";

import { SimulationTimeRepository } from "@/lib/data/simulation-time-repository";
import { DateTime } from "luxon";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SimulationTimeContextType {
  currentTime: DateTime;
  advanceTime: (duration: {
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
  }) => Promise<void>;
  reverseTime: (duration: {
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
  }) => Promise<void>;
  reset: () => Promise<void>;
}

const SimulationTimeContext = createContext<
  SimulationTimeContextType | undefined
>(undefined);

export function SimulationTimeProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());
  const repository = new SimulationTimeRepository();

  // Load initial time state
  useEffect(() => {
    const loadTime = async () => {
      const time = await repository.get();
      setCurrentTime(time.currentTime);
    };
    loadTime();
  }, []);

  const advanceTime = async (duration: {
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
  }) => {
    await repository.advanceTime(duration);
    const newTime = await repository.get();
    setCurrentTime(newTime.currentTime);
  };

  const reverseTime = async (duration: {
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
  }) => {
    await repository.reverseTime(duration);
    const newTime = await repository.get();
    setCurrentTime(newTime.currentTime);
  };

  const reset = async () => {
    const originalTime = await repository.reset();
    setCurrentTime(originalTime);
  };

  return (
    <SimulationTimeContext.Provider
      value={{
        currentTime,
        advanceTime,
        reverseTime,
        reset,
      }}
    >
      {children}
    </SimulationTimeContext.Provider>
  );
}

export function useSimulationTime() {
  const context = useContext(SimulationTimeContext);
  if (context === undefined) {
    throw new Error(
      "useSimulationTime must be used within a SimulationTimeProvider"
    );
  }
  return context;
}
