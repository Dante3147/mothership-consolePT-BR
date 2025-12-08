import { db } from "@/lib/data/firebase";
import { Transaction } from "@/lib/models/transaction";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { DateTime } from "luxon";
import { PeriodicPaymentRepository } from "./periodic-payment-repository";

export class TransactionRepository {
  private readonly collection = "transactions";
  private periodicPaymentRepo: PeriodicPaymentRepository;

  constructor() {
    this.periodicPaymentRepo = new PeriodicPaymentRepository();
  }

  // Stream all transactions in real-time
  stream(
    onUpdate: (transactions: Transaction[]) => void,
    onError?: (error: Error) => void
  ): () => void {
    console.log("streaming transactions");
    const unsubscribe = onSnapshot(
      collection(db, this.collection),
      (snapshot) => {
        const transactions = snapshot.docs.map((doc) =>
          Transaction.fromJson(doc.id, doc.data())
        );
        onUpdate(transactions);
      },
      onError
    );

    return unsubscribe;
  }

  async getForPlayer(
    playerId: string,
    startDate?: DateTime,
    endDate?: DateTime
  ): Promise<Transaction[]> {
    console.log("getting transactions for player", playerId);
    let q = query(
      collection(db, this.collection),
      where("playerId", "==", playerId),
      orderBy("date", "asc")
    );

    if (endDate) {
      q = query(
        q,
        where("date", "<=", Timestamp.fromMillis(endDate.toMillis()))
      );
    }

    const querySnapshot = await getDocs(q);
    const realTransactions = querySnapshot.docs.map((doc) =>
      Transaction.fromJson(doc.id, doc.data())
    );

    // If no endDate, return only real transactions
    if (!endDate) return realTransactions;

    // Get virtual transactions from periodic payments
    const virtualTransactions = await this.getVirtualTransactions(
      playerId,
      startDate || DateTime.fromMillis(0),
      endDate
    );

    // Combine and sort all transactions
    return [...realTransactions, ...virtualTransactions].sort(
      (a, b) => a.date.toMillis() - b.date.toMillis()
    );
  }

  private async getVirtualTransactions(
    playerId: string,
    startDate: DateTime,
    endDate: DateTime
  ): Promise<Transaction[]> {
    const payments = await this.periodicPaymentRepo.getActivePayments(
      playerId,
      endDate
    );

    const virtualTransactions: Transaction[] = [];

    for (const payment of payments) {
      const paymentDates = payment.getPaymentsBetween(startDate, endDate);

      for (const date of paymentDates) {
        virtualTransactions.push(
          new Transaction(
            `virtual-${payment.id}-${date.toMillis()}`,
            playerId,
            payment.payment.getAmount().multiply(-1),
            date
          )
        );
      }
    }

    return virtualTransactions;
  }

  async add(transaction: Transaction): Promise<void> {
    console.log("adding transaction", transaction.id);
    await setDoc(
      doc(db, this.collection, transaction.id),
      transaction.toJson()
    );
  }

  async removeForPlayer(playerId: string): Promise<void> {
    const transactions = await this.getForPlayer(playerId);
    for (const transaction of transactions) {
      console.log("removing transactions for player", playerId);
      await deleteDoc(doc(db, this.collection, transaction.id));
    }
    await this.periodicPaymentRepo.removeForPlayer(playerId);
  }

  async getCurrentBalance(playerId: string, asOf: DateTime): Promise<number> {
    console.log("getting current balance for player", playerId);
    const transactions = await this.getForPlayer(playerId, asOf);
    return transactions.reduce((sum, t) => sum + t.credits.numeric, 0);
  }
}
