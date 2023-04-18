import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  userDetailsForm!:FormGroup

  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>, private formBuilder:FormBuilder,
    private authService: AuthServiceService) {
    this.userDetailsForm=this.formBuilder.group({
      "userName":["",[Validators.required,Validators.pattern('^[A-Za-z]+([ ]?[A-Za-z]+)*$')]],
      "email":["",[Validators.required,Validators.email]],
      "password":["",[Validators.required,Validators.minLength(6)]]
    })
  }

  submit() {
    // console.log(this.userDetailsForm.value);
    const userData=this.userDetailsForm.value
    if(this.userDetailsForm.valid){

      this.authService.userSignupWithPhoneNumber(userData).subscribe((res:any)=>{
        console.log(res);
        this.dialogRef.close(true)
      })
    }

    // this.dialogRef.close(true)

  }

}
