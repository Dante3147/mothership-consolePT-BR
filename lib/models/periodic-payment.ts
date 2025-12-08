import { Duration } from "luxon";
import { Credit } from "./credit";

export class PeriodicPayment {
  constructor(
    private readonly amount: Credit,
    private readonly duration: Duration
  ) {}

  toJson() {
    return {
      amount: this.amount.toJson(),
      duration: this.duration.toISO(),
    };
  }

  static fromJson(json: { [key: string]: any }): PeriodicPayment {
    return new PeriodicPayment(
      Credit.fromJson(json.amount),
      Duration.fromISO(json.duration)
    );
  }

  toString(): string {
    const amount = this.amount.toString();
    const duration = this.formatDuration();
    return `${amount}/${duration}`;
  }

  private formatDuration(): string {
    if (this.duration.as("hours") === 1) return "hour";
    if (this.duration.as("days") === 1) return "day";
    if (this.duration.as("weeks") === 1) return "week";
    if (this.duration.as("months") === 1) return "month";
    if (this.duration.as("years") === 1) return "year";

    if (this.duration.as("hours") > 0) return `${this.duration.as("hours")}h`;
    if (this.duration.as("days") > 0) return `${this.duration.as("days")}d`;
    if (this.duration.as("weeks") > 0) return `${this.duration.as("weeks")}w`;
    if (this.duration.as("months") > 0) return `${this.duration.as("months")}m`;
    if (this.duration.as("years") > 0) return `${this.duration.as("years")}y`;

    throw new Error("Invalid duration");
  }

  getAmount(): Credit {
    return this.amount;
  }

  getDuration(): Duration {
    return this.duration;
  }

  getAmountPerMonth(): Credit {
    const months = this.duration.as("months");
    return this.amount.divide(months);
  }

  getAmountPerYear(): Credit {
    const years = this.duration.as("years");
    return this.amount.divide(years);
  }

  getAmountPerHour(): Credit {
    const hours = this.duration.as("hours");
    return this.amount.divide(hours);
  }
}
