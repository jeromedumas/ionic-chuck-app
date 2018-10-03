import { IJwtToken } from './../../models/jwt.model';
import { API } from './../../app/app.constants';
import { Observable } from 'rxjs/Observable';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) {
    this.jwtService.getToken().then(token => {
      if (token) {
        this.isAuthenticatedSubject.next(true);
      }
    });
  };


  login(username, password): Observable<boolean> {
    return this.apiService
      .post(API.endPointCreateSession, { username, password })
      .map(
        (jwtToken: IJwtToken) => {
          if (jwtToken && jwtToken.access_token) {
            this.jwtService.saveToken(jwtToken.access_token);
            this.isAuthenticatedSubject.next(true);
          } else {
            this.isAuthenticatedSubject.next(false);
          }
          return true;
        })
  }

  signup(username, password): Observable<boolean> {
    return this.apiService
      .post(API.endPointCreateUser, { username, password });
  }

  logout() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken().then(() => {
      this.isAuthenticatedSubject.next(false);
    });
  }
}
