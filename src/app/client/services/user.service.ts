import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HostDetails } from 'src/app/models/hostModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) { }

  isUserLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  createHostRequest(data: HostDetails) {
    return this._http.post('host-request', data);
  }

  findUser(id: string): Observable<any> {
    return this._http.get(`user/${id}`)
  }

  createList(data: any) {
    console.log('fsfsfs');

    return this._http.post('createList', data)
  }


}
