import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    apiEndPoint = environment.apiEndPoint;

    constructor(private http: HttpClient) { }

    get(url) {
        return this.http.get(this.apiEndPoint + url);
    }

    getById(url, id) {
        return this.http.get(this.apiEndPoint + url + '/' + id);
    }

    post(url: string, body: any) {
      return this.http.post(this.apiEndPoint + url, body);
    }

}
