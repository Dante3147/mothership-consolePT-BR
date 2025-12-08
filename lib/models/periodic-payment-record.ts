import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { PeriodicPayment } from "./periodic-payment";

export class PeriodicPaymentRecord {
  constructor(
    public id: string,
    public playerId: string,
    public name: string,
    public payment: PeriodicPayment,
    public startDate: DateTime,
    public endDate: DateTime | null
  ) {}

  toJson() {
    return {
      playerId: this.playerId,
      name: this.name,
      payment: this.payment.toJson(),
      startDate: Timestamp.fromMillis(this.startDate.toMillis()),
      endDate: this.endDate
        ? Timestamp.fromMillis(this.endDate.toMillis())
        : null,
    };
  }

  static fromJson(id: string, json: any): PeriodicPaymentRecord {
    return new PeriodicPaymentRecord(
      id,
      json.playerId,
      json.name,
      PeriodicPayment.fromJson(json.payment),
      DateTime.fromMillis((json.startDate as Timestamp).toMillis()),
      json.endDate
        ? DateTime.fromMillis((json.endDate as Timestamp).toMillis())
        : null
    );
  }

  isActive(at: DateTime): boolean {
    return at >= this.startDate && (!this.endDate || at <= this.endDate);
  }

  getNextPaymentDate(after: DateTime): DateTime | null {
    if (!this.isActive(after)) return null;

    const duration = this.payment.getDuration();
    let nextDate = this.startDate;

    while (nextDate <= after) {
      nextDate = nextDate.plus(duration);
    }

    if (this.endDate && nextDate > this.endDate) {
      return null;
    }

    return nextDate;
  }

  getPaymentsBetween(start: DateTime, end: DateTime): DateTime[] {
    if (!this.isActive(start)) return [];

    const payments: DateTime[] = [];
    const duration = this.payment.getDuration();
    let currentDate = this.startDate;

    // Find the first payment date after start
    while (currentDate < start) {
      currentDate = currentDate.plus(duration);
    }

    // Add all payment dates up to end
    while (
      currentDate <= end &&
      (!this.endDate || currentDate <= this.endDate)
    ) {
      payments.push(currentDate);
      currentDate = currentDate.plus(duration);
    }

    return payments;
  }
}
