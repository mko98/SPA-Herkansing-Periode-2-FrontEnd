import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../../publisher/publisher.model';
import {Game} from '../game.model';
import {GameService} from '../game.service';
import {PublisherService} from '../../publisher/publisher.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  @Input() pub: Publisher;
  @Input() index: string;
  id: string;
  publisher: Publisher[];
  gameForm: FormGroup;
  publisherForm: FormGroup;
  idChar: string;
  editMode = false;
  selectedGenre: string;
  publishers: Publisher;
  game: Game;
  subscription: Subscription;
  addPublisherVisible: boolean;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private publisherService: PublisherService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idChar = params['charid'];
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      // this.gameService.getGame(this.id)
      //   .then(games => this.game = games);
    });
    this.subscription = this.gameService.gameChanged
      .subscribe(
        (games: Game[]) => {
          console.log('get friends aangeroepen.');
          console.dir(games);
        }
      );

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
    this.addPublisherVisible = true;
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.gameService.updateGame(this.id, this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
      this.gameService.getGames()
        .then(games => {
          this.gameService.gameChanged.next(games.slice());
        });
    }
    this.onCancel();
  }

  onAddPublisher() {
    this.publisherService.addPublisher(this.publisherForm.value);
    this.publisherService.getPublishers()
      .then(publishers => {
        this.publisherService.publisherChanged.next(publishers.slice());
      });

    this.publisherForm.reset();
    this.addPublisherVisible = true;
  }

  onChangeAddPublisher() {
    this.addPublisherVisible = false;
    console.log(this.addPublisherVisible);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancelAddPublisher() {
    this.addPublisherVisible = true;
    this.publisherForm.reset();
  }

  private initForm() {
    let editgame = new Game({name: '', price: ''});
    let editPublisher = new Publisher({publisherName: ''});
    // const GameCharacters = new FormArray([]);

    if (this.editMode) {
      this.gameService.getGame(this.id)
        .then(game => {
          editgame = game;
          if (editgame.publishers != null) {
            this.publisherService.getPublisher(editgame.publishers[0]._id).then(publisher => {
              editPublisher = publisher;
              console.log(editPublisher);

              this.gameForm = new FormGroup({
                'title': new FormControl(editgame.title, Validators.required),
                'genre': new FormControl(editgame.genre, Validators.required),
                'engine': new FormControl(editgame.engine, Validators.required),
                'publishers': new FormControl(editPublisher.publisherName, Validators.required),
              });
            });
          }

          this.gameForm = new FormGroup({
            'title': new FormControl(editgame.title, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'engine': new FormControl(editgame.engine, Validators.required),
            'publishers': new FormControl(editgame.publishers)
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


    this.gameForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'genre': new FormControl('', Validators.required),
      'engine': new FormControl('', Validators.required),
      'publishers': new FormControl('', Validators.required)
    });


  }


}
