import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RocketchatService {

  constructor(private http: HttpService) { }

  getRocketChatUserToken() {
    return this.http.get(`${environment.url_api}/rocket.checkuser`);
  }

}
