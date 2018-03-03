import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../publisher.model';
import {Subscription} from 'rxjs/Subscription';
import {Game} from '../../game/game.model';
import {GameService} from '../../game/game.service';
import {PublisherService} from '../publisher.service';

@Component({
  selector: 'app-publisher-game-item',
  templateUrl: './publisher-game-item.component.html',
  styleUrls: ['./publisher-game-item.component.css']
})
export class PublisherGameItemComponent implements OnInit {
  @Input() game: Game;
  @Input() publisherId: string;
  @Input() index: number;
  @Output() publisherSelected = new EventEmitter<void>();
  publisher: Publisher = new Publisher({publisherName: 'loading'});
  subscription: Subscription;
  id: string;
  private status;


  constructor( private route: ActivatedRoute,
               private publisherService: PublisherService,
               private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.publisherService.getPublisher(this.id).then(res => {
            this.publisher = res;
          });
          // this.status = this.gameService.checkIdInGame(this.id)
          //   .then((res) => {
          //     this.status = res;
          //   });
        }
      );

    this.subscription = this.publisherService.sPublisherChanged
      .subscribe(
        () => {
          this.publisherService.getPublisher(this.id).then(res => {
            console.log('log de publisher' + res.publisher);
            this.publisher = res;
            // this.postPublisherId = res.publisher;
          });
        });
  }

  onSelected() {
    this.publisherSelected.emit();
  }

  onGameClick() {
    console.log('id:' + this.game._id);
    this.router.navigate(['../../games', this.game._id], {relativeTo: this.route});
  }

  // onDeletePublisher() {
  //   this.publisherService.deletePublisher(this.game._id, this.publisherId);
  // }

}

