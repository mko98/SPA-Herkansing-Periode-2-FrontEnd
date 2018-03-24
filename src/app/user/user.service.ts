import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from './user.model';

@Injectable()
export class UserService {

  private serverUrl = 'http://localhost:3000/api/v1/';

  constructor(private http: Http) {}



  userRegister(user: User) {
    return this.http.post(this.serverUrl + 'register', user)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  userVerify(user: User) {
    return this.http.post(this.serverUrl + 'verify', user)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  userLogin(user: User) {
    return this.http.post(this.serverUrl + 'login', user)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  resendVerifyEmail(user: User) {
    return this.http.post(this.serverUrl + 'resendemail', user)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  clearLocalStorage(){
    localStorage.clear();
  }

}
