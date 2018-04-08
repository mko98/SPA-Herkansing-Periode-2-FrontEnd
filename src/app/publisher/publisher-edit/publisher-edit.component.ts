import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../../publisher/publisher.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PublisherService} from '../../publisher/publisher.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit{
  id: string;
  publisherForm: FormGroup;
  idChar: string;
  editMode = false;
  publishers: Publisher;
  publisher: Publisher;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private publisherService: PublisherService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idChar = params['charid'];
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.subscription = this.publisherService.publisherChanged
      .subscribe(
        (publishers: Publisher[]) => {
          console.log('get friends aangeroepen.');
          console.dir(publishers);
        }
      );
  }

  onSubmit() {

    if (this.editMode) {
      this.publisherService.updatePublisher(this.id, this.publisherForm.value);
    } else {
      console.log(localStorage.userId);
      this.publisherService.addPublisher(this.publisherForm.value);
      this.publisherService.getPublishers()
        .then(publishers => {
          this.publisherService.publisherChanged.next(publishers.slice());
        });
    }
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    const editpublisher = new Publisher({name: '', price: ''});

    if (this.editMode) {
      this.publisherService.getPublisher(this.id)
        .then(publisher => {
          this.publisherForm = new FormGroup({
            publisherName: new FormControl(publisher.publisherName, Validators.required),
            founder: new FormControl(publisher.founder, Validators.required),
            ceo: new FormControl(publisher.ceo, Validators.required),
            publisherWebsite: new FormControl(publisher.publisherWebsite, Validators.required),
            yearFounded: new FormControl(publisher.yearFounded, Validators.required),
          });
        })
        .catch(error => console.log(error));
    }

    this.publisherForm = new FormGroup({
      publisherName: new FormControl('', Validators.required),
      founder: new FormControl('', Validators.required),
      ceo: new FormControl('', Validators.required),
      publisherWebsite: new FormControl('http://www.example.com', Validators.required),
      yearFounded: new FormControl('', Validators.required),
      user: new FormControl(localStorage.userId)
    });
  }

}
