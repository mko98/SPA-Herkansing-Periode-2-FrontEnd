import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Subscription} from 'rxjs/Subscription';
import {Game} from '../game.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../../publisher/publisher.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  games: Game;
  game: Game = new Game({title: 'loading', imagePath: ''});
  publisher: { publisherName: string};
  id: string;
  @Input() index: string;
  private subscription: Subscription;

  constructor(private gameService: GameService,
              // private publisherService: PublisherService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.gameService.getGame(this.id).then(res => {
            this.game = res;
          });
        }

      );
    this.subscription = this.gameService.gameChanged
      .subscribe(
        (games: Game[]) => {
          this.gameService.getGame(this.id).then(res => {
              this.game = res;
            }
          );
        });

  }

  onEditGame() {
    console.log(this.game);
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteGame() {
    console.log('delete');
    this.gameService.deleteGame(this.id);
  }

  onGameSelected(publisher: Publisher) {
    console.log('click2');
    this.publisher = publisher;
    console.log(publisher);
  }
}
