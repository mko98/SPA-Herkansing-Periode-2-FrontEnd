import {User} from '../user/user.model';

export class Publisher {
  private id: string;
  private _publisherName: string;
  private _founder: string;
  private _ceo: string;
  private _publisherWebsite: string;
  private _yearFounded: Date;
  private _user: User;

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

  public get publisherWebsite(): string {
    return this._publisherWebsite;
  }

  public set publisherWebsite(i: string) {
    this._publisherWebsite = i;
  }

  public get yearFounded(): Date {
    return this._yearFounded;
  }

  public set yearFounded(i: Date) {
    this._yearFounded = i;
  }

  public get user(): User {
    return this._user;
  }

  public set user(n: User) {
    this._user = n;
  }
}
