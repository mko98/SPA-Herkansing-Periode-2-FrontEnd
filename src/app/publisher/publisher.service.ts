import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Publisher} from '../publisher/publisher.model';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';
import {Game} from '../game/game.model';

@Injectable()
export class PublisherService {
  publisherChanged = new Subject<Publisher[]>();
  sPublisherChanged = new Subject<Publisher>();

  private serverUrl = 'http://localhost:3000/api/v1/publishers/';
  private publishers: Publisher[];
  private games: Game[];

  constructor(private http: Http) {}



  getPublisher(index: string) {
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

  getPublishedBy(id: string) {
    return this.http.get(environment.serverUrlChar + 'publishedby' + '/' + id)
      .toPromise()
      .then(response => {
        console.log('id resp: ' + id);
        console.log('resp serv: ' + response.json());
       this.games = response.json() as Game[];
        return response.json() as Game[];
      })
      .catch(error => {
        return error;
      });

  }


  addPublisher(publisher: Publisher) {
    return this.http.post(this.serverUrl, publisher)
      .toPromise()
      .then(response => {
        this.publisherChanged.next(this.publishers);
      });
  }

  updatePublisher(index: string, newPublisher: Publisher) {
    return this.http.put(this.serverUrl + index, newPublisher)
      .toPromise()
      .then(response => {
        this.publisherChanged.next(this.publishers);
      });
  }

  deletePublisher(index: string) {
    return this.http.delete(this.serverUrl + index)
      .toPromise()
      .then(response => {
        this.publisherChanged.next(this.publishers.slice());
      });
  }

  addPublisherGameRelationship(publisherId: string, gameId: string) {
    return this.http.post(this.serverUrl + 'makeconnection' + '/' + publisherId + '/' + gameId, null)
      .toPromise()
      .then(response => {
        this.publisherChanged.next(this.publishers);
      });
  }

  removeGameRelationship(gameId: string) {
    // return this.http.delete(this.serverUrl + 'deletegameconnection' + '/' + publisherId + '/' + gameId, null)
    return this.http.delete(this.serverUrl + 'deletegameconnection' + '/' + gameId)
      .toPromise()
      .then(response => {
      });
  }

  removePublisherRelationship(gameId: string) {
    return this.http.delete(this.serverUrl + 'deletepublisherconnection' + '/' + gameId)
      .toPromise()
      .then(response => {
      });
  }

  deletePublisherNeo(id: string) {
    return this.http.delete(this.serverUrl + 'deletepublisher' + '/' + id)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  deleteGameNeo(gameId: string) {
    return this.http.delete(this.serverUrl + 'deleteGame' + '/' + gameId, null)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }


  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
