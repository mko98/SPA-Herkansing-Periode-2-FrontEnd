export class Publisher {
  private id: string;
  private _name: string;
  private _founder: string;
  private _ceo: string;

  public get _id() {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get name() {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get founder() {
    return this._founder;
  }

  public set founder(n: string) {
    this._founder = n;
  }
}
