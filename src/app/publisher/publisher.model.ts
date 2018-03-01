export class Publisher {
  private id: string;
  private _publisherName: string;
  private _founder: string;
  private _ceo: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get _id() {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get publisherName() {
    return this._publisherName;
  }

  public set publisherName(n: string) {
    this._publisherName = n;
  }

  public get founder() {
    return this._founder;
  }

  public set founder(n: string) {
    this._founder = n;
  }

  public get ceo() {
    return this._ceo;
  }

  public set ceo(n: string) {
    this._ceo = n;
  }
}
