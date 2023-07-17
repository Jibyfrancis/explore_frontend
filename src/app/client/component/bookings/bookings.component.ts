import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Booking } from 'src/app/models/orderModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = [
    'propertyName',
    'propertyAddress',
    'image',
    'checkin',
    'checkOut',
    'guest',
    'orderStatus',
    'totalAmount',
    'action',
  ];
  dataSource: Booking[] = [];
  showButton: boolean = true;
  bookingStatus!: string;

  constructor(private _userService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this._userService.getAllBooking().subscribe((data: any) => {
      console.log(data);

      this.dataSource = data.booking.map((order: Booking) => ({
        _id: order._id,
        propertyName: order.propertyName,
        propertyAddress: order.propertyAddress,
        image: order.image,
        checkIn: order.checkIn,
        checkOut: order.checkOut,
        adult: order.adult,
        children: order.children,
        totalPrice: order.totalPrice,
        bookingStatus: order.bookingStatus,
      }));
    });
  }
  cancel(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      width: '350px',
      height: '200px',
      text:'',
    };
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this._userService.cancelBooking(id).subscribe((res: any) => {
          if (res.status === 'Success') {
            this._userService.getAllBooking().subscribe((data: any) => {
              this.dataSource = data.booking.map((order: Booking) => ({
                _id: order._id,
                propertyName: order.propertyName,
                propertyAddress: order.propertyAddress,
                image: order.image,
                checkIn: order.checkIn,
                checkOut: order.checkOut,
                adult: order.adult,
                children: order.children,
                totalPrice: order.totalPrice,
                bookingStatus: order.bookingStatus,
              }));
            });
          }
        });
      }
    });
  }
}
