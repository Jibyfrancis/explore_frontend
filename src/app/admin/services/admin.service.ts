import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IadminModael } from '../../models/adminModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _http: HttpClient) { }

  adminLogin(data: IadminModael): Observable<any> {
    return this._http.post('auth/adminLogin', data);
  }

  isAdminLoggedIn() {
    if (localStorage.getItem('admin')) {
      const adminToken: any = JSON.parse(localStorage.getItem('admin') || '{}');

      return true;
    } else {
      return false;
    }
  }

  getAllUser(): Observable<any> {
    return this._http.get('admin/getAllUsers');
  }

  changeUserStatus(id: string, value: boolean): Observable<any> {
    const body = { id: id, value: value };
    return this._http.put('admin/changeUserStatus', body);
  }

  getAllHostRequest(): Observable<any> {
    return this._http.get('admin/getAllHostRequest');
  }

  approveHostRequest(id: string): Observable<any> {
    const body = { id: id, };
    console.log(id);

    return this._http.put('admin/approveHostRequest', body);
  }

  addAmenity(data: any) {
    console.log(data);

    return this._http.post('admin/addAmenity', data);
  }

  getAllAmenity() {
    return this._http.get('admin/getAllAmenity');
  }

  removeAmenity(id:string):Observable<any>{
    console.log(id);

    return this._http.delete(`admin/removeAmenity/${id}`)
  }

  addPropertyType(data: any) {
    return this._http.post('admin/addPropertyType', data);
  }

  getAllPropertyType(){
    return this._http.get('admin/getAllPropertyType');
  }

  removePropertyType(id:string):Observable<any>{
    return this._http.delete(`admin/removePropertyType/${id}`)
  }
}
