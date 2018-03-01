import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Publisher} from '../../publisher/publisher.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from '../game.service';
import {Game} from '../game.model';

@Component({
  selector: 'app-game-publisher-item',
  templateUrl: './game-publisher-item.component.html',
  styleUrls: ['./game-publisher-item.component.css']
})
export class GamePublisherItemComponent implements OnInit {
  @Input() publisher: Publisher;
  @Input() gameId: string;
  @Input() index: number;
  @Output() publisherSelected = new EventEmitter<void>();
  game: Game = new Game({title: 'loading', imagePath: ''});
  subscription: Subscription;
  id: string;
  private status;


  constructor( private route: ActivatedRoute,
               private gameService: GameService,
               private router: Router) { }

  ngOnInit() {
       this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.gameService.getGame(this.id).then(res => {
            this.game = res;
          });
          // this.status = this.gameService.checkIdInGame(this.id)
          //   .then((res) => {
          //     this.status = res;
          //   });
        }
      );

    this.subscription = this.gameService.sGameChanged
      .subscribe(
        (posts: Game) => {
          this.gameService.getGame(this.id).then(res => {
            console.log('log de publisher' + res.publisher);
            this.game = res;
            // this.postPublisherId = res.publisher;
          });
        });
  }



  onSelected() {
    this.publisherSelected.emit();
  }

  onDeletePublisher() {
    this.gameService.deletePublisher(this.publisher._id, this.gameId);
  }

}
