import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutItem } from 'src/app/models/checkOutModel';
import { HostDetails } from 'src/app/models/hostModel';
import { Booking } from 'src/app/models/orderModel';
import { PropertySearch } from 'src/app/models/searchModel';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private _http: HttpClient, private _router: Router) { }
  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  public searchResults$ = this.searchResultsSubject.asObservable();




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

hostNewproperty(data: any) {
    return this._http.post('add-new-property', data)
  }

  getAllProperty(): Observable<any> {
    return this._http.get('get-all-property')
  }

  getPropertyById(id: string) {
    return this._http.get(`property-detail/${id}`)
  }

  checkOut(data: CheckoutItem): Observable<object> {
    return this._http.post('checkOut', data, { withCredentials: true })
  }
  setValue(paymentId: string, orderId: string) {
    let value = { paymentId: paymentId, orderId: orderId }
    localStorage.setItem('order', JSON.stringify(value))

  }
  getValue(): string | null {
    let paymentId = localStorage.getItem('paymentid')
    return paymentId
  }
  confirmOrder(order: object) {
    return this._http.patch('confirm-order', order, { withCredentials: true })
  }
  getAllBooking(): Observable<Booking> {
    return this._http.get<Booking>('get-all-booking')
  }
  cancelBooking(id: string) {
    return this._http.patch(`cancel-booking/${id}`, {})
  }
  searchProperty(data: PropertySearch) {
    this._http.post('search-property', data).subscribe((res: any) => {
      this.searchResultsSubject.next(res);
      this._router.navigateByUrl('/search')
    })
  }
  editProperty(data: any) {
    console.log(data);

    return this._http.put('edit-property',data)
  }
  getPropertyByHostId(id: string) {
    return this._http.get(`user-property-list/${id}`)
  }

  removeProperty(id: string) {
    return this._http.delete(`remove-property/${id}`)
  }



}
