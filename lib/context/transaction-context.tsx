"use client";

import { PeriodicPaymentRepository } from "@/lib/data/periodic-payment-repository";
import { TransactionRepository } from "@/lib/data/transaction-repository";
import { Credit } from "@/lib/models/credit";
import { PeriodicPaymentRecord } from "@/lib/models/periodic-payment-record";
import { Transaction } from "@/lib/models/transaction";
import { DateTime } from "luxon";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSimulationTime } from "./simulation-time-context";

interface TransactionContextType {
  transactions: Transaction[];
  periodicPayments: PeriodicPaymentRecord[];
  // Getters
  getPeriodicPayments: (
    playerId: string,
    asOf?: DateTime
  ) => PeriodicPaymentRecord[];
  getPlayerBalance: (playerId: string, asOf?: DateTime) => number;
  getPlayerTimeToZero: (playerId: string, asOf?: DateTime) => number | null;
  getPlayerTransactions: (
    playerId: string,
    startDate?: DateTime,
    endDate?: DateTime
  ) => Promise<Transaction[]>;
  // Actions
  addTransaction: (playerId: string, credits: Credit) => Promise<void>;
  addPeriodicPayment: (
    payment: Omit<PeriodicPaymentRecord, "id">
  ) => Promise<void>;
  removePeriodicPayment: (id: string) => Promise<void>;
  endPeriodicPayment: (id: string) => Promise<void>;
  removeTransactionsForPlayer: (playerId: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [periodicPayments, setPeriodicPayments] = useState<
    PeriodicPaymentRecord[]
  >([]);

  const transactionRepo = useMemo(() => new TransactionRepository(), []);
  const periodicPaymentRepo = useMemo(
    () => new PeriodicPaymentRepository(),
    []
  );
  const { currentTime } = useSimulationTime();

  // Set up repository streams
  useEffect(() => {
    // Stream transactions from repository
    const unsubscribeTransactions = transactionRepo.stream(
      (transactions) => setTransactions(transactions),
      (error) => console.error("Error streaming transactions:", error)
    );

    // Stream periodic payments from repository
    const unsubscribePeriodicPayments = periodicPaymentRepo.stream(
      (payments) => setPeriodicPayments(payments),
      (error) => console.error("Error streaming periodic payments:", error)
    );

    // Cleanup streams on unmount
    return () => {
      unsubscribeTransactions();
      unsubscribePeriodicPayments();
    };
  }, [transactionRepo, periodicPaymentRepo]);

  // Simple getter for periodic payments
  const getPeriodicPayments = useCallback(
    (playerId: string, asOf: DateTime = currentTime) => {
      return periodicPayments.filter(
        (payment) => payment.playerId === playerId && payment.isActive(asOf)
      );
    },
    [periodicPayments, currentTime]
  );

  // Get player balance using streamed data
  const getPlayerBalance = useCallback(
    (playerId: string, asOf: DateTime = currentTime) => {
      // Calculate base balance from transactions
      const baseBalance = transactions
        .filter((t) => t.playerId === playerId && t.date <= asOf)
        .reduce((sum, t) => sum + t.credits.numeric, 0);

      // Add impact of periodic payments
      const activePayments = getPeriodicPayments(playerId, asOf);
      const periodicBalance = activePayments.reduce((sum, payment) => {
        const payments = payment.getPaymentsBetween(payment.startDate, asOf);
        return sum - payments.length * payment.payment.getAmount().numeric;
      }, 0);

      return baseBalance + periodicBalance;
    },
    [transactions, getPeriodicPayments]
  );

  // Calculate time to zero using streamed data
  const getPlayerTimeToZero = useCallback(
    (playerId: string, asOf: DateTime = currentTime) => {
      const balance = getPlayerBalance(playerId, asOf);
      const activePayments = getPeriodicPayments(playerId, asOf);

      if (activePayments.length === 0) return null;
      if (balance <= 0) return 0;

      // Pre-calculate all payment dates and amounts for efficiency
      const maxSimulationDate = asOf.plus({ years: 5 });
      const paymentSchedule: Array<{ date: DateTime; amount: number }> = [];

      for (const payment of activePayments) {
        // Get payments that happen AFTER asOf (not including asOf itself)
        const nextPaymentDate = payment.getNextPaymentDate(asOf);
        if (nextPaymentDate && nextPaymentDate <= maxSimulationDate) {
          // Get all payments from the next payment date onwards
          const paymentDates = payment.getPaymentsBetween(
            nextPaymentDate,
            maxSimulationDate
          );
          for (const date of paymentDates) {
            paymentSchedule.push({
              date,
              amount: payment.payment.getAmount().numeric,
            });
          }
        }
      }

      // Sort by date for efficient processing
      paymentSchedule.sort((a, b) => a.date.toMillis() - b.date.toMillis());

      // Group payments by date and sum amounts
      const consolidatedPayments = new Map<number, number>();
      for (const payment of paymentSchedule) {
        const dateKey = payment.date.toMillis();
        consolidatedPayments.set(
          dateKey,
          (consolidatedPayments.get(dateKey) || 0) + payment.amount
        );
      }

      // Simulate through the consolidated payment schedule
      let currentBalance = balance;
      for (const [dateMillis, amount] of consolidatedPayments) {
        const paymentDate = DateTime.fromMillis(dateMillis);

        // Check if player will go broke on this payment
        if (currentBalance < amount) {
          const daysUntilPayment = Math.floor(
            paymentDate.diff(asOf, "days").days
          );
          return Math.max(0, daysUntilPayment);
        }

        // Apply payment and continue
        currentBalance -= amount;
      }

      // If we've processed all payments without going broke, return null
      return null;
    },
    [getPlayerBalance, getPeriodicPayments]
  );

  // Get player transactions from repository (still async for date filtering)
  const getPlayerTransactions = useCallback(
    async (playerId: string, startDate?: DateTime, endDate?: DateTime) => {
      return await transactionRepo.getForPlayer(playerId, startDate, endDate);
    },
    [transactionRepo]
  );

  // Actions - call repository methods without manual state updates
  const addTransaction = useCallback(
    async (playerId: string, credits: Credit) => {
      const transaction = new Transaction(
        `transaction-${playerId}-${Date.now()}`,
        playerId,
        credits,
        currentTime
      );

      await transactionRepo.add(transaction);
      // State will be updated via repository stream
    },
    [currentTime, transactionRepo]
  );

  const addPeriodicPayment = useCallback(
    async (payment: Omit<PeriodicPaymentRecord, "id">) => {
      const newPayment = new PeriodicPaymentRecord(
        `payment-${payment.playerId}-${payment.name}-${Date.now()}`,
        payment.playerId,
        payment.name,
        payment.payment,
        payment.startDate,
        payment.endDate
      );

      await periodicPaymentRepo.add(newPayment);
      // State will be updated via repository stream
    },
    [periodicPaymentRepo]
  );

  const removePeriodicPayment = useCallback(
    async (id: string) => {
      await periodicPaymentRepo.remove(id);
      // State will be updated via repository stream
    },
    [periodicPaymentRepo]
  );

  const endPeriodicPayment = useCallback(
    async (id: string) => {
      const payment = periodicPayments.find((p) => p.id === id);
      if (!payment) return;

      const updatedPayment = new PeriodicPaymentRecord(
        payment.id,
        payment.playerId,
        payment.name,
        payment.payment,
        payment.startDate,
        currentTime.minus({ days: 1 })
      );

      await periodicPaymentRepo.update(updatedPayment);
      // State will be updated via repository stream
    },
    [periodicPayments, currentTime, periodicPaymentRepo]
  );

  const removeTransactionsForPlayer = useCallback(
    async (playerId: string) => {
      await transactionRepo.removeForPlayer(playerId);
      // State will be updated via repository stream
    },
    [transactionRepo]
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        periodicPayments,
        getPeriodicPayments,
        getPlayerBalance,
        getPlayerTimeToZero,
        getPlayerTransactions,
        addTransaction,
        addPeriodicPayment,
        removePeriodicPayment,
        endPeriodicPayment,
        removeTransactionsForPlayer,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
}
