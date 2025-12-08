export class Credit {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  toJson() {
    return {
      credits: this.value,
    };
  }

  static fromJson(json: { credits: number }): Credit {
    return new Credit(json.credits);
  }

  toString(): string {
    if (this.value === 0) return "-";

    const absValue = Math.abs(this.value);

    if (absValue >= 1000000) {
      // Format as millions
      const millions = this.value / 1000000;
      const formatted =
        millions % 1 === 0
          ? millions.toString()
          : millions
              .toFixed(2)
              .replace(/\.?0+$/, "")
              .replace(".", ",");
      return `${formatted}mcr`;
    } else if (absValue >= 1000) {
      // Format as thousands
      const thousands = this.value / 1000;
      const formatted =
        thousands % 1 === 0
          ? thousands.toString()
          : thousands
              .toFixed(2)
              .replace(/\.?0+$/, "")
              .replace(".", ",");
      return `${formatted}kcr`;
    } else {
      // Format as regular number
      return `${this.value.toLocaleString()}cr`;
    }
  }

  get numeric(): number {
    return this.value;
  }

  valueOf(): number {
    return this.value;
  }

  [Symbol.toPrimitive](hint: "default" | "string" | "number"): string | number {
    if (hint === "string") {
      return this.toString();
    }
    return this.value;
  }

  getValue(): number {
    return this.value;
  }

  add(other: Credit): Credit {
    return new Credit(this.value + other.value);
  }

  subtract(other: Credit): Credit {
    return new Credit(this.value - other.value);
  }

  multiply(factor: number): Credit {
    return new Credit(this.value * factor);
  }

  divide(divisor: number): Credit {
    return new Credit(this.value / divisor);
  }

  equals(other: Credit): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Credit): boolean {
    return this.value > other.value;
  }

  isLessThan(other: Credit): boolean {
    return this.value < other.value;
  }

  // Arithmetic operators
  [Symbol.for("+")](other: Credit): number {
    return this.value + other.value;
  }

  [Symbol.for("-")](other: Credit): number {
    return this.value - other.value;
  }

  [Symbol.for("*")](other: Credit): number {
    return this.value * other.value;
  }

  [Symbol.for("/")](other: Credit): number {
    return this.value / other.value;
  }
}
