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
  wrongLogin: Boolean = true;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.clearLocalStorage();
    this.route.params.subscribe((params: Params) => {
        this.initForm();
        // this.gameService.getGame(this.id)
        //   .then(games => this.game = games);
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
        } else {
          localStorage.setItem('userId', res._id);
          this.router.navigate(['/games'], {relativeTo: this.route});
        }
      });
    console.log(localStorage);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    this.userLoginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

}

