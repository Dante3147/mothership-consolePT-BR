import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";

export class SimulationTime {
  constructor(public currentTime: DateTime, public originalTime: DateTime) {}

  toJson() {
    return {
      currentTime: Timestamp.fromMillis(this.currentTime.toMillis()),
      originalTime: Timestamp.fromMillis(this.originalTime.toMillis()),
    };
  }

  static fromJson(json: any): SimulationTime {
    return new SimulationTime(
      DateTime.fromMillis((json.currentTime as Timestamp).toMillis()),
      DateTime.fromMillis((json.originalTime as Timestamp).toMillis())
    );
  }
}
