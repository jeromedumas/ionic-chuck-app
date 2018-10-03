
import { API_BASE_URL } from './../../app/app.constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {

  public readonly baseURL: string = API_BASE_URL;

  constructor(
    public http: Http,
    private jwtService: JwtService
  ) {
  }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    if (this.jwtService.latestToken) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.latestToken}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.baseURL}${path}`, { headers: this.setHeaders(), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    console.log(`${this.baseURL}${path}`);

    return this.http.put(
      `${this.baseURL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.baseURL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.baseURL}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

}
