import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  paymentId!: string | null
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    let order: object = JSON.parse(localStorage.getItem('order') as string)

    this.userService.confirmOrder(order).subscribe((res) => {
      console.log(res);

      localStorage.removeItem('order')
    })
    // console.log(this.paymentId.paymentId);

  }
}
