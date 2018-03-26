import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  id: string;
  userRegisterForm: FormGroup;
  verify = true;
  afterRegister = false;
  wrongToken = true;
  emailResend = true;
  alreadyExists = true;
  emailSend = true;

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
    console.log(this.userRegisterForm.value);
    console.log(this.userRegisterForm.controls);
    this.userService.userRegister(this.userRegisterForm.value)
      .then((res) => {
        if (res.status === 401) {
          this.alreadyExists = false;
        } else {
          this.verify = false;
          this.afterRegister = true;
          this.alreadyExists = true;
          this.emailSend = false;
        }

      });
    console.log(localStorage);
  }


  onVerify() {
    this.userService.userVerify(this.userRegisterForm.value)
      .then((res) => {
        console.dir(res);
        if (res.status === 400) {
          this.wrongToken = false;
        } else {
          this.userService.userLogin(this.userRegisterForm.value).then((response) => {
            console.log('userLogin');
            console.dir(response);
            localStorage.setItem('userId', response._id);
            this.router.navigate(['/'], {relativeTo: this.route});
          });

        }
      });
  }

  onResendEmail() {
    this.userService.resendVerifyEmail(this.userRegisterForm.value)
      .then((res) => {
        this.emailSend = true;
        this.emailResend = false;
      });
  }

  onCancel() {
    this.router.navigate(['/'], {relativeTo: this.route});
  }

  private initForm() {
    this.userRegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),
      emailVerifyToken: new FormControl('')
    });
  }

}

