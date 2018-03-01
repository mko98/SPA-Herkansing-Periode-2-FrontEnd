import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Game} from '../../game.model';
import {GameService} from '../../game.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {

  @Input() game: Game;
  @Input() index: string;
  subscription: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.subscription = this.gameService.gameChanged
      .subscribe(
        (games: Game[]) => {
          console.log('get friends aangeroepen.');
          console.dir(games);
        }
      );
    this.index = this.game._id;

  }
}
