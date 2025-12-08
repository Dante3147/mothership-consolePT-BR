export class Player {
  constructor(public id: string, public name: string) {}

  toJson() {
    return {
      name: this.name,
    };
  }

  static fromJson(id: string, json: { name: string }): Player {
    return new Player(id, json.name);
  }
}
