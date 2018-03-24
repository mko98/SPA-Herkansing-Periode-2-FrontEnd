import {Publisher} from '../publisher/publisher.model';
import {User} from '../user/user.model';

export class Game {
  private id: string;
  private _title: string;
  private _genre: string;
  private _engine: string;
  private _imagePath: string;
  private _publishers: Publisher;
  private _user: User;

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

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(i: string) {
    this._imagePath = i;
  }

  public get publishers(): Publisher {
    return this._publishers;
  }

  public set publishers(n: Publisher) {
    this._publishers = n;
  }

  public get user(): User {
    return this._user;
  }

  public set user(n: User) {
    this._user = n;
  }

}
