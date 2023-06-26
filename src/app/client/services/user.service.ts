import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { CheckoutItem } from 'src/app/models/checkOutModel';
import { HostDetails } from 'src/app/models/hostModel';
import { Booking } from 'src/app/models/orderModel';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private _http: HttpClient) { }

  isUserLoggedIn() {
    const user = localStorage.getItem('user') ?? '{}';
    const userData = JSON.parse(user);
    const userToken = userData.token;
    if (userToken) {
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
    return this._http.post('createList', data)
  }

  getAllProperty(): Observable<any> {
    return this._http.get('get-all-property')
  }

  getPropertyById(id: string) {
    return this._http.get(`property-detail/${id}`)
  }

  checkOut(data: CheckoutItem) :Observable<object> {
    return this._http.post('checkOut', data,{withCredentials:true})
  }
  setValue(paymentId:string,orderId:string) {
    let value={paymentId:paymentId,orderId:orderId}
    localStorage.setItem('order',JSON.stringify(value))

  }
  getValue(): string|null {
    let paymentId=localStorage.getItem('paymentid')
    return paymentId
  }
  confirmOrder(order:object){
    return this._http.patch('confirm-order',order,{withCredentials:true})
  }
  getAllBooking():Observable<Booking>{
    return this._http.get<Booking>('get-all-booking')
  }
  cancelBooking(id:string){
    return this._http.patch(`cancel-booking/${id}`,{})
  }

}
