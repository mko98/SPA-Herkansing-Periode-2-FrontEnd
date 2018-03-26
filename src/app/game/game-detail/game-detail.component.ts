import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Subscription} from 'rxjs/Subscription';
import {Game} from '../game.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../../publisher/publisher.model';
import {PublisherService} from '../../publisher/publisher.service';
import {DateAdapter} from '@angular/material';



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
              private publisherService: PublisherService,
              private route: ActivatedRoute,
              private router: Router,
              private adapter: DateAdapter<any>) {
  }

  ngOnInit() {
    console.log('caalled oninit');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.gameService.getGame(this.id).then(res => {
            this.game = res;
            console.log('gameUser: ' + this.game.user);
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
    this.adapter.setLocale('nl');
  }

  get userId(): any {
    return localStorage.userId;
  }

  onEditGame() {
    console.log(this.game);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteGame() {
    console.log('delete');
    this.router.navigate(['../'], {relativeTo: this.route});
    this.gameService.getGame(this.id)
      .then(game => {
        console.log('before delete game');
        this.publisherService.deleteGameNeo(this.id);
        console.log('after delete game');
        // this.publisherService.removePublisherGameRelationship(game.publishers[0]._id, this.id);
        this.gameService.deleteGame(this.id);
      });
  }


  onGameSelected(publisher: Publisher) {
    console.log('click2');
    this.publisher = publisher;
    console.log(publisher);
  }
}
