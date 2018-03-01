import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Publisher} from '../../publisher/publisher.model';
import {PublisherService} from '../../publisher/publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {

  publishers: Publisher[];
  subscription: Subscription;

  constructor(private publisherService: PublisherService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.publisherService.getPublishers()
      .then(res => {
        this.publishers = res;
      });
    this.subscription = this.publisherService.publisherChanged
      .subscribe(
        (publishers: Publisher[]) => {
          this.publisherService.getPublishers()
            .then(res => {
              this.publishers = res;
            });
          console.log('get publishers aangeroepen.');
          console.dir(publishers);
        }
      );
  }

  onNewPublisher() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // onGenre() {
  //   this.router.navigate(['/genre/' + this.publisher.genre], {relativeTo: this.route});
  //   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
