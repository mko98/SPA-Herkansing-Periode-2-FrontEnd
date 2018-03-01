import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Publisher} from '../publisher/publisher.model';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';

@Injectable()
export class PublisherService {
  publisherChanged = new Subject<Publisher[]>();
  sPublisherChanged = new Subject<Publisher>();

  private serverUrl = 'http://localhost:3000/api/v1/publishers/';
  private publishers: Publisher[];
  private publisher: Publisher;
  private serverPublisherUrl = environment.serverUrl + '/publishers/';

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

  // addPublisher(id: string, publisherId: string) {
  //   console.log('addPublisher');
  //   console.log('publisherId: ' + publisherId);
  //   console.log('publisherId: ' + id);
  //
  //   return this.http.put(this.serverUrl + id + '/' + publisherId, null)
  //     .toPromise()
  //     .then(response => {
  //       this.sPublisherChanged.next(this.publisher);
  //       return response.json() as Publisher[];
  //     })
  //     .catch(error => {
  //       return error;
  //     });
  // }

  // deletePublisher(id: string) {
  //   console.log('addPublisher');
  //   console.log('publisherId: ' + id);
  //
  //   return this.http.delete(this.serverUrl + id )
  //     .toPromise()
  //     .then(response => {
  //       this.sPublisherChanged.next(this.publisher);
  //       return response.json() as Publisher;
  //     })
  //     .catch(error => {
  //       return error;
  //     });
  // }


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


  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
