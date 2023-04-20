import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private sharedService: SharedService) {
    this.loginForm = this.formBuilder.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  submit() {
    console.log(this.loginForm.value);
    const data = this.loginForm.value
    this.authService.userLogin(data).subscribe((res) => {
      console.log(res.data.token);
      console.log(res.data.user);
      const userData = {
        token: res.data.token,
        user: res.data.user
      }

      if (res.data && res.data.token && res.data.user) {

        localStorage.setItem('user', JSON.stringify(userData))
        this.sharedService.loggedInUser = res.data.user.userName;
        this.sharedService.loggedInUserChanged.emit(res.data.user.userName);

        this.dialogRef.close()

      }

    })

  }

}
