import { Component, OnInit } from '@angular/core';
import {Game} from '../game.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[];
  subscription: Subscription;
  isLoggedIn: boolean;


  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.gameService.getGames()
      .then(res => {
        this.games = res;
      });
    this.subscription = this.gameService.gameChanged
      .subscribe(
        (games: Game[]) => {
          this.gameService.getGames()
            .then(res => {
              this.games = res;
            });
          console.log('get games aangeroepen.');
          console.dir(games);
        }
      );
    this.isLoggedIn = localStorage.userId === undefined;
  }

  onLogout() {
    localStorage.clear();
    this.ngOnInit();
  }

  onLogin() {
    this.router.navigate(['../user/login'], {relativeTo: this.route});

  }

  onNewGame() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
