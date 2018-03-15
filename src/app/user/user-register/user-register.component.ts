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
    this.userService.userRegister(this.userRegisterForm.value)
      .then((res) => {
        this.router.navigate(['/login'], {relativeTo: this.route});
      });
    console.log(localStorage);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    this.userRegisterForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

}

