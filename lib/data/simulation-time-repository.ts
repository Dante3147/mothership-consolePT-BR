import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { SimulationTime } from "../models/simulation-time";
import { db } from "./firebase";

export class SimulationTimeRepository {
  private readonly collection = "simulationTime";

  async get(): Promise<SimulationTime> {
    console.log("getting simulation time");
    const document = await getDoc(doc(db, this.collection, "current"));
    if (!document.exists()) {
      // Initialize with current time if not exists
      const init = DateTime.now().plus({ years: 500 }).startOf("day");
      const initialTime = new SimulationTime(init, init);
      await setDoc(doc(db, this.collection, "current"), initialTime.toJson());
      return initialTime;
    }
    return SimulationTime.fromJson(document.data());
  }

  async set(time: DateTime): Promise<void> {
    console.log("setting simulation time", time);
    await setDoc(
      doc(db, this.collection, "current"),
      {
        currentTime: Timestamp.fromMillis(time.toMillis()),
      },
      { merge: true }
    );
  }

  async reset(): Promise<DateTime> {
    const current = await this.get();
    await this.set(current.originalTime);
    return current.originalTime;
  }

  async advanceTime(duration: {
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
  }): Promise<void> {
    const current = await this.get();
    const newTime = current.currentTime.plus(duration);
    await this.set(newTime);
  }

  async reverseTime(duration: {
    hours?: number;
    days?: number;
    months?: number;
    years?: number;
  }): Promise<void> {
    const current = await this.get();
    const newTime = current.currentTime.minus(duration);
    await this.set(newTime);
  }
}
