import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CancelBookingComponent } from 'src/app/client/component/bookings/cancel-booking/cancel-booking.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
 inputText!: string
  constructor(
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data.text);
    this.inputText=this.data.text

  }

  onConfirm(): void {
    this.dialogRef.close(true); // Return true to indicate confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false to indicate cancellation
  }
}
