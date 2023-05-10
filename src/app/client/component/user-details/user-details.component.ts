import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  userDetailsForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private sharedService: SharedService
  ) {
    this.userDetailsForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]+([ ]?[A-Za-z]+)*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    const userData = this.userDetailsForm.value;
    if (this.userDetailsForm.valid) {
      this.authService
        .userSignupWithPhoneNumber(userData)
        .subscribe((res: any) => {
          const userData = {
            token: res.data.token,
            user: res.data.usersData,
          };
          if (res.data && res.data.token && res.data.usersData) {
            localStorage.setItem('user', JSON.stringify(userData));
            this.sharedService.loggedInUser = res.data.usersData.userName;
            this.sharedService.loggedInUserChanged.emit(
              res.data.usersData.userName
            );
            this.dialogRef.close(true);
          }
        });
    }
  }
}
