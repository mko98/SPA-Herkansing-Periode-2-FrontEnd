import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../../publisher/publisher.model';
import {PublisherService} from '../../publisher/publisher.service';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../../game/game.service';

@Component({
  selector: 'app-publisher-detail',
  templateUrl: './publisher-detail.component.html',
  styleUrls: ['./publisher-detail.component.css']
})
export class PublisherDetailComponent implements OnInit {

  publisher: Publisher = new Publisher({publisherName: 'loading', imagePath: ''});
  id: string;
  @Input() index: string;
  private subscription: Subscription;


  constructor(private publisherService: PublisherService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.publisherService.getPublisher(this.id).then(res => {
            this.publisher = res;
          });
        }

      );
    this.subscription = this.publisherService.publisherChanged
      .subscribe(
        (publishers: Publisher[]) => {
          this.publisherService.getPublisher(this.id).then(res => {
              this.publisher = res;
            }
          );
        });

  }

  onEditPublisher() {
    console.log(this.publisher);
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeletePublisher() {
    console.log('delete');
    this.router.navigate(['../'], {relativeTo: this.route});
    this.publisherService.deletePublisherNeo(this.id);
    this.publisherService.deletePublisher(this.id);
  }

  onPublisherSelected(publisher: Publisher) {
    console.log('click2');
    this.publisher = publisher;
    console.log(publisher);

  }
}
