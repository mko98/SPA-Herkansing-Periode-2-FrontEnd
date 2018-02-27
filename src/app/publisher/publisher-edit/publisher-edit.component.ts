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
export class PublisherEditComponent implements OnInit {
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
      // this.publisherService.getPublisher(this.id)
      //   .then(publishers => this.publisher = publishers);
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
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.publisherService.updatePublisher(this.id, this.publisherForm.value);
    } else {
      this.publisherService.addPublisher(this.publisherForm.value);
      this.publisherService.getPublishers()
        .then(publishers => {
          this.publisherService.publisherChanged.next(publishers.slice());
        });
    }
    this.onCancel();
  }


  // onAddCharacter() {
  //   (<FormArray>this.publisherForm.get('characters')).push(
  //     new FormGroup({
  //       'name': new FormControl(null, Validators.required),
  //       'imagePath': new FormControl(null)
  //     })
  //   );
  // }
  //
  // onDeleteCharacter(index: number) {
  //   (<FormArray>this.publisherForm.get('characters')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editpublisher = new Publisher({name: '', price: ''});

    // const PublisherCharacters = new FormArray([]);

    if (this.editMode) {
      this.publisherService.getPublisher(this.id)
        .then(publisher => {
          editpublisher = publisher;
          // if (publisher['characters']) {
          //   for (const guest of publisher.characters) {
          //     PublisherCharacters.push(
          //       new FormGroup({
          //         'name': new FormControl(guest.name, Validators.required),
          //         'imagePath': new FormControl(guest.imagePath)
          //       })
          //     );
          //
          //   }
          // }
          this.publisherForm = new FormGroup({
            'publisherName': new FormControl(editpublisher.publisherName, Validators.required),
            'founder': new FormControl(editpublisher.founder, Validators.required),
            'ceo': new FormControl(editpublisher.ceo, Validators.required),
            // 'publishers': new FormControl(editpublisher.publishers)
          });
        })
        .catch(error => console.log(error));
    }

    this.publisherForm = new FormGroup({
      'publisherName': new FormControl('', Validators.required),
      'founder': new FormControl('', Validators.required),
      'ceo': new FormControl('', Validators.required)
      // 'publishers': new FormArray([])
    });
  }

}
