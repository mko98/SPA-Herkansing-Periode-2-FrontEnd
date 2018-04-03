import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameListComponent} from '../game/game-list/game-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'})
export class HeaderComponent implements OnInit{

 isLoggedIn: boolean;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(url => {
      console.log(url);
      this.isLoggedIn = localStorage.userId === undefined;
    });
  }

  onClick() {
    this.router.navigate(['/'], {relativeTo: this.route});
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/'], {relativeTo: this.route});
  }

  onLogin() {
    this.router.navigate(['../user/login'], {relativeTo: this.route});
  }

  onNewGame() {
    this.router.navigate(['../games/new'], {relativeTo: this.route});
  }

  onNewPublisher() {
    this.router.navigate(['../publishers/new'], {relativeTo: this.route});
  }


}



