import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Booking } from 'src/app/models/orderModel';
import { MatDialog } from '@angular/material/dialog';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';



// const ELEMENT_DATA: Order[] = [
// ];

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = ['propertyName', 'propertyAddress', 'image', 'checkin', 'checkOut', 'guest', 'orderStatus', 'totalAmount', 'action'];
  dataSource: Booking[] = []
  showButton:boolean=true

  constructor(private _userService: UserService, public dialog: MatDialog) { }

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
        bookingStatus: order.bookingStatus

      }))
      console.log(this.dataSource);
    })
  }
  cancel(id: string) {
    const dialogRef = this.dialog.open(CancelBookingComponent, {
      width: '350px',
      height: "200px",
    })
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res === 'true') {
        this._userService.cancelBooking(id).subscribe((res: any) => {
          if (res.status === 'Success') {
            this.showButton=false

          }
        })
      }
    })

  }

}
