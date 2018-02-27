import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Publisher} from '../../../publisher/publisher.model';
import {PublisherService} from '../../../publisher/publisher.service';

@Component({
  selector: 'app-publisher-item',
  templateUrl: './publisher-item.component.html',
  styleUrls: ['./publisher-item.component.css']
})
export class PublisherItemComponent implements OnInit {

  @Input() publisher: Publisher;
  @Input() gameId: string;
  @Input() index: string;
  @Input() publisherIndex: number;
  subscription: Subscription;

  constructor(private publisherService: PublisherService) {
  }

  ngOnInit() {
    this.subscription = this.publisherService.publisherChanged
      .subscribe(
        (publishers: Publisher[]) => {
          console.log('get friends aangeroepen.');
          console.dir(publishers);
        }
      );
    this.index = this.publisher._id;

  }
}
