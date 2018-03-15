export class User {
  private id: string;
  private _email: string;
  private _password: string;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get email(): string {
    return this._email;
  }

  public set email(n: string) {
    this._email = n;
  }

  public get password(): string {
    return this._password;
  }

  public set password(n: string) {
    this._password = n;
  }

}
