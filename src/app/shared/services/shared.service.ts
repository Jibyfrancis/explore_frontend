import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  loggedInUser: string = '';
  loggedInUserChanged: EventEmitter<string> = new EventEmitter<string>();
}
