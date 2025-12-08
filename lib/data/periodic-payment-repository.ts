import { db } from "@/lib/data/firebase";
import { PeriodicPaymentRecord } from "@/lib/models/periodic-payment-record";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { DateTime } from "luxon";

export class PeriodicPaymentRepository {
  private readonly collection = "periodic-payments";

  // Stream all periodic payments in real-time
  stream(
    onUpdate: (payments: PeriodicPaymentRecord[]) => void,
    onError?: (error: Error) => void
  ): () => void {
    console.log("streaming periodic payments");
    const unsubscribe = onSnapshot(
      collection(db, this.collection),
      (snapshot) => {
        const payments = snapshot.docs.map((doc) =>
          PeriodicPaymentRecord.fromJson(doc.id, doc.data())
        );
        onUpdate(payments);
      },
      onError
    );

    return unsubscribe;
  }

  async getForPlayer(playerId: string): Promise<PeriodicPaymentRecord[]> {
    console.log("getting periodic payments for player", playerId);
    const q = query(
      collection(db, this.collection),
      where("playerId", "==", playerId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) =>
      PeriodicPaymentRecord.fromJson(doc.id, doc.data())
    );
  }

  async add(payment: PeriodicPaymentRecord): Promise<void> {
    console.log("adding periodic payment", payment.id);
    await setDoc(doc(db, this.collection, payment.id), payment.toJson());
  }

  async update(payment: PeriodicPaymentRecord): Promise<void> {
    console.log("updating periodic payment", payment.id);
    await updateDoc(doc(db, this.collection, payment.id), payment.toJson());
  }

  async remove(id: string): Promise<void> {
    console.log("removing periodic payment", id);
    await deleteDoc(doc(db, this.collection, id));
  }

  async removeForPlayer(playerId: string): Promise<void> {
    console.log("removing periodic payments for player", playerId);
    const payments = await this.getForPlayer(playerId);
    for (const payment of payments) {
      await deleteDoc(doc(db, this.collection, payment.id));
    }
  }

  async getActivePayments(
    playerId: string,
    at: DateTime
  ): Promise<PeriodicPaymentRecord[]> {
    const payments = await this.getForPlayer(playerId);
    return payments.filter((p) => p.isActive(at));
  }
}
