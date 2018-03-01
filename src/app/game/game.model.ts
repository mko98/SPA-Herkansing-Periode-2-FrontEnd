import {Publisher} from '../publisher/publisher.model';

export class Game {
  private id: string;
  private _title: string;
  private _genre: string;
  private _engine: string;
  private _publishers: Publisher;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get title(): string {
    return this._title;
  }

  public set title(n: string) {
    this._title = n;
  }

  public get genre(): string {
    return this._genre;
  }

  public set genre(n: string) {
    this._genre = n;
  }

  public get engine(): string {
    return this._engine;
  }

  public set engine(g: string) {
    this._engine = g;
  }

  public get publishers(): Publisher {
    return this._publishers;
  }

  public set publishers(n: Publisher) {
    this._publishers = n;
  }

}
