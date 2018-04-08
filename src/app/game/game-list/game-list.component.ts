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
  isLoggedIn = true;
  showFilterGenre = true;
  showFilterEngine = true;
  showFilterPlatform = true;
  genreValues: '';
  engineValues: '';
  platformValues: '';

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
    this.router.events.subscribe(url => {
      this.isLoggedIn = localStorage.userId === undefined;
      console.log(this.isLoggedIn);
      console.log(url);
    });
    if (!this.showFilterGenre || !this.showFilterEngine || !this.showFilterPlatform) {

    } else {
      this.showFilterGenre = true;
      this.showFilterEngine = true;
      this.showFilterPlatform = true;
    }

  }



  onKeyGenre(event: any) {
    this.genreValues = event.target.value;
    console.log(this.genreValues);
    this.gameService.searchGenre(this.genreValues).then((filteredGames) => {
          this.games = filteredGames;
        });
  }

  onKeyEngine(event: any) {
    this.engineValues = event.target.value;
    console.log(this.engineValues);
    this.gameService.searchEngine(this.engineValues).then((filteredGames) => {
      this.games = filteredGames;
    });
  }

  onKeyPlatform(event: any) {
    this.platformValues = event.target.value;
    console.log(this.platformValues);
    this.gameService.searchPlatform(this.platformValues).then((filteredGames) => {
      this.games = filteredGames;
    });
  }

  showGenreFilter() {
    this.showFilterGenre = !this.showFilterGenre;

    if (this.showFilterEngine === false) {
      this.showFilterEngine = true;
      this.ngOnInit();
    } else if (this.showFilterPlatform === false) {
      this.showFilterPlatform = true;
      this.ngOnInit();
    }
  }

  showEngineFilter() {
    this.showFilterEngine = !this.showFilterEngine;

      if (this.showFilterGenre === false) {
      this.showFilterGenre = true;
      this.ngOnInit();
    } else if(this.showFilterPlatform === false) {
        this.showFilterPlatform = true;
        this.ngOnInit();
      }
  }

  showPlatformFilter() {
    this.showFilterPlatform = !this.showFilterPlatform;

    if (this.showFilterGenre === false) {
      this.showFilterGenre = true;
      this.ngOnInit();
    } else if (this.showFilterEngine === false) {
      this.showFilterEngine = true;
      this.ngOnInit();
    }
  }


}
