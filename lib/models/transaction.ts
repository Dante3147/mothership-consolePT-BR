import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { Credit } from "./credit";

export class Transaction {
  constructor(
    public id: string,
    public playerId: string,
    public credits: Credit,
    public date: DateTime
  ) {}

  toJson() {
    return {
      playerId: this.playerId,
      credits: this.credits.toJson(),
      date: Timestamp.fromMillis(this.date.toMillis()),
    };
  }

  static fromJson(id: string, json: any): Transaction {
    return new Transaction(
      id,
      json.playerId as string,
      Credit.fromJson(json.credits),
      DateTime.fromMillis((json.date as Timestamp).toMillis())
    );
  }
}
