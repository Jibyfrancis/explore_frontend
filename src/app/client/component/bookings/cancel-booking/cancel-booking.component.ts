import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Return true to indicate confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false to indicate cancellation
  }
}

