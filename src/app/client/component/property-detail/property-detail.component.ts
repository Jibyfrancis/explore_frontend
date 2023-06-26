import { Component, OnInit } from '@angular/core';
import { faBed, faBath, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PropertyDetailsInterface } from 'src/app/models/singlePropert';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CheckoutItem } from 'src/app/models/checkOutModel';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../enviroments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {

  bedrooms = faBed;
  bathroom = faBath;
  kitchen = faKitchenSet;
  properties!: PropertyDetailsInterface
  loggedIn!: boolean
  adult: number = 1;
  children: number = 0;
  message: boolean = false;
  dissable: boolean = false;
  currentDate!: Date;
  checkIn: Date = new Date();
  checkOut: Date = new Date();
  nights: number = 1
  totalPrice!: number
  checkOutItem!: CheckoutItem
  paymentresponse: boolean = false

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private dataAdapter: DateAdapter<Date>,
    private router:Router,
    // public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog
  ) {
    this.currentDate = new Date();
    this.dataAdapter.setLocale('en-IN');
  }

  ngOnInit() {
    let id: string | null = this.activeRoute.snapshot.paramMap.get('id') ?? '';
    this.userService.getPropertyById(id).subscribe((res: any) => {
      this.properties = res.property[0];
      this.totalPrice = this.properties.price;
      this.checkOut.setDate(this.checkIn.getDate() + 1);
    });
    if (this.userService.isUserLoggedIn()) {
      this.loggedIn = true
    }
    else {
      this.loggedIn = false
    }

  }
  inc(inp: string) {
    if (inp === 'adult') {
      if (this.adult + this.children >= this.properties.guest) {
        this.message = true;
        this.dissable = true;
      } else {
        this.message = false;
        this.dissable = false;
        this.adult += 1;
      }
    } else if (inp === 'child') {
      if (this.adult + this.children >= this.properties.guest) {
        this.message = true;
        this.dissable = true;
      } else {
        this.message = false;
        this.dissable = false;
        this.children += 1;
      }
    }
  }
  dec(inp: string) {
    if (inp === 'adult') {
      this.adult += -1;
      this.dissable = false;
      this.message = false;
      if (this.adult + this.children === this.properties.guest) {
        this.dissable = true;
        this.message = true;
        this.adult += -1;
      }
    } else if (inp === 'child') {
      this.children += -1;
      this.dissable = false;
      this.message = false;
      if (this.adult + this.children === this.properties.guest) {
        this.dissable = true;
        this.message = true;
        this.children += -1;
      }
    }
  }

  getNumberOfNights() {
    if (this.checkIn && this.checkOut) {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(
        Math.abs((this.checkIn.getTime() - this.checkOut.getTime()) / oneDay)
      );
      this.nights = diffDays;
      this.totalPrice = this.nights * this.properties.price
    }
  }

  onCheckoutDateChange() {
    this.getNumberOfNights();
  }

  onCheckOut(): void {
    if (this.loggedIn) {

      this.paymentresponse = true
      this.checkOutItem = {
        _id: this.properties._id,
        propertyName: this.properties.name,
        propertyAddress: this.properties.address.address,
        image: this.properties.imageUrl[0],
        adult: this.adult,
        children: this.children,
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        totalPrice: this.totalPrice,
      }
      console.log(this.checkOutItem);
      this.userService.checkOut(this.checkOutItem).subscribe(async (res: any) => {
        console.log(res);
        this.userService.setValue(res.paymentId,res.orderId)
        let strip=await loadStripe(environment.stripePublishibleKey)
        strip?.redirectToCheckout({
          sessionId:res.paymentId
        })
        // this.router.navigate(['success'])
      },(err)=>{
        this.router.navigate(['cancel'])
      })
    }
    else{
      const dialogRef = this.dialog.open(SigninComponent);
    }

  }

}
