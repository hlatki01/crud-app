import { UserModel } from './../model/userModel';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from './http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from './../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

  private loginSubject = new Subject<boolean>();

  constructor(public http: HttpService) {
    super('users', http);
  }

  login(email: string, password: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}/users/auth`, { email, password });
  }

  getRocketChatUserToken() {
    return this.http.get(`${environment.url_api}/users/rockettoken`);
  }


  configureLogin(o): void {
    const { token, user } = o.data;
    localStorage.setItem('bankconnector:token', token);
    localStorage.setItem('bankconnector:user', JSON.stringify(user));
    this.loginSubject.next(this.isStaticLogged);
  }

  get isLogged(): Observable<boolean> {
    return this.loginSubject.asObservable();

  }
  get isStaticLogged(): boolean {
    return !!localStorage.getItem('bankconnector:token');
  }

  static get token(): string {
    return localStorage.getItem('bankconnector:token');
  }
}
