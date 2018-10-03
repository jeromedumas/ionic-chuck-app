import { API } from './../../app/app.constants';
import { ChuckFact, ChuckFriend } from './../../models/chuck.model';

import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Injectable } from '@angular/core';


@Injectable()
export class ChuckService {
  constructor(
    private apiService: ApiService
  ) { }

  getRandomFact(): Observable<ChuckFact> {
    return this.apiService
      .get(API.endPointGetRandomChuckFact);
  }

  getFriends(): Observable<ChuckFriend[]> {
    return this.apiService
      .get(API.endPointGetFriends);
  }

  setMyLocation(username: string, latitude: string, longitude: string): Observable<ChuckFriend> {
    return this.apiService
      .put(`${API.endPointSetMyLocation}/${username}`, { latitude, longitude });
  }
}
