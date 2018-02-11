import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Game} from './game.model';
import {Publisher} from '../publisher/publisher.model';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';

@Injectable()
export class GameService {
  gameChanged = new Subject<Game[]>();
  sGameChanged = new Subject<Game>();

  private serverUrl = 'http://localhost:3000/api/v1/games/';
  private games: Game[];
  private game: Game;
  private publishers: Publisher[];
  private serverPublisherUrl = environment.serverUrl + '/publishers/';

  constructor(private http: Http) {}

  getGames() {
    return this.http.get(this.serverUrl)
      .toPromise()
      .then(response => {
        this.games = response.json() as Game[];
        console.log(response.json());
        return response.json() as Game[];
      })
      .catch(error => {
        return error;
      });
  }

  getGame(index: string) {
    if (index == null)
      return null;
    return this.http.get(this.serverUrl + index)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  getPublishers() {
    return this.http.get(environment.serverUrlChar)
      .toPromise()
      .then(response => {
        this.publishers = response.json() as Publisher[];
        return response.json() as Publisher[];
      })
      .catch(error => {
        return error;
      });

  }

  getPublisher(index: string) {
    console.log('getPublishers 2222222222222222222222');
    if (index == null)
      return null;
    return this.http.get(environment.serverUrlChar + index)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  addPublisher(id: string, gameId: string) {
    console.log('addPublisher');
    console.log('gameId: ' + gameId);
    console.log('publisherId: ' + id);

    return this.http.put(this.serverUrl + id + '/' + gameId, null)
      .toPromise()
      .then(response => {
        this.sGameChanged.next(this.game);
        return response.json() as Publisher[];
      })
      .catch(error => {
        return error;
      });
  }

  deletePublisher(id: string, gameId: string) {
    console.log('addPublisher');
    console.log('gameId: ' + gameId);
    console.log('publisherId: ' + id);

    return this.http.delete(this.serverUrl + id + '/' + gameId)
      .toPromise()
      .then(response => {
        this.sGameChanged.next(this.game);
        return response.json() as Publisher;
      })
      .catch(error => {
        return error;
      });
  }


  addGame(game: Game) {
    return this.http.post(this.serverUrl, game)
      .toPromise()
      .then(response => {
        this.gameChanged.next(this.games);
      });
  }

  updateGame(index: string, newGame: Game) {
    return this.http.put(this.serverUrl + index, newGame)
      .toPromise()
      .then(response => {
        this.gameChanged.next(this.games);
      });
  }

  deleteGame(index: string) {
    return this.http.delete(this.serverUrl + index)
      .toPromise()
      .then(response => {
        this.gameChanged.next(this.games.slice());
      });
  }


  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
