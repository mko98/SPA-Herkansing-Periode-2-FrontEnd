import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  id: string;
  userLoginForm: FormGroup;
  wrongLogin = true;
  verifyEmail = true;
  wrongToken = true;
  emailResend = true;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.clearLocalStorage();
    this.route.params.subscribe((params: Params) => {
        this.initForm();
      }
    );
  }

  onSubmit() {

    this.userService.userLogin(this.userLoginForm.value)
      .then((res) => {
        console.log(res.status);
        if (res.status === 401) {
          this.wrongLogin = false;
          this.router.navigate(['/login'], {relativeTo: this.route});
        } else if (res.isVerified !== true) {
          this.verifyEmail = false;
          this.wrongLogin = true;
        } else {
          localStorage.setItem('userId', res._id);
          console.log('localStorage: ' + localStorage.userId);
          this.router.navigate(['/games'], {relativeTo: this.route});
        }
      });
    console.log(localStorage);
  }

  onRegister() {
    this.router.navigate(['../register'], {relativeTo: this.route});

  }

  onCancel() {
    this.router.navigate(['/'], {relativeTo: this.route});
  }

  onVerify() {
    this.userService.userVerify(this.userLoginForm.value)
      .then((res) => {
        console.log(res.status);
        if (res.status === 400) {
          this.wrongToken = false;
          this.wrongLogin = true;
        } else if(res.status === 401) {
          this.wrongLogin = false;
        } else {
          this.wrongLogin = false;
          localStorage.setItem('userId', res._id);
          this.router.navigate(['/'], {relativeTo: this.route});
        }
      });
  }

  onResendEmail() {
    this.userService.resendVerifyEmail(this.userLoginForm.value)
      .then((res) => {
        this.emailResend = false;
      });
  }

  private initForm() {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      emailVerifyToken: new FormControl('')
    });
  }

}

