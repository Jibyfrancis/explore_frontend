import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent {
  otp!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<OtpComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.otp = this.formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  VerifyOtp() {
    if (this.otp.valid) {
      const otp = parseInt(this.otp.value.otp);
      this.authService.verifyOtp(otp).then((Response: any) => {
        if (Response) {
          this.dialogRef.close(true);
        }
      });
    }
  }
}
