import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Publisher} from '../../publisher/publisher.model';
import {Game} from '../game.model';
import {GameService} from '../game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  id: string;
  gameForm: FormGroup;
  idChar: string;
  editMode = false;
  selectedGenre: string;
  publishers: Publisher;
  game: Game;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
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


  // onAddCharacter() {
  //   (<FormArray>this.gameForm.get('characters')).push(
  //     new FormGroup({
  //       'name': new FormControl(null, Validators.required),
  //       'imagePath': new FormControl(null)
  //     })
  //   );
  // }
  //
  // onDeleteCharacter(index: number) {
  //   (<FormArray>this.gameForm.get('characters')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editgame = new Game({name: '', price: ''});

    // const GameCharacters = new FormArray([]);

    if (this.editMode) {
      this.gameService.getGame(this.id)
        .then(game => {
          editgame = game;
          // if (game['characters']) {
          //   for (const guest of game.characters) {
          //     GameCharacters.push(
          //       new FormGroup({
          //         'name': new FormControl(guest.name, Validators.required),
          //         'imagePath': new FormControl(guest.imagePath)
          //       })
          //     );
          //
          //   }
          // }
          this.gameForm = new FormGroup({
            'title': new FormControl(editgame.title, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'engine': new FormControl(editgame.engine, Validators.required),
            // 'publishers': new FormControl(editgame.publishers)
          });
        })
        .catch(error => console.log(error));
    }

    this.gameForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'genre': new FormControl(0, Validators.required),
      'engine': new FormControl('', Validators.required)
      // 'publishers': new FormArray([])
    });
  }

}
