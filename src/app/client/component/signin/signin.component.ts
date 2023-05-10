import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IuserModael } from 'src/app/models/userModel';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { WindowService } from 'src/app/services/window.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  fagoogle = faGoogle;
  famail = faEnvelope;
  signUpform!: FormGroup;
  selectedCountryCode!: string;
  submit: boolean = false;
  user: IuserModael = { email: '', userName: '', photoUrl: '' };
  login!: boolean;
  signin!: boolean;
  windowRef: any;
  appVerifier: any;
  countryCodes: { value: string; label: string }[] = [
    { value: '+1', label: 'United States (+1)' },
    { value: '+44', label: 'United Kingdom (+44)' },
    { value: '+91', label: 'India (+91)' },
    // add more country codes here
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private dialogRef: MatDialogRef<SigninComponent>,
    public dialog: MatDialog,
    private windowService: WindowService,
    private sharedService: SharedService
  ) {
    this.signUpform = this.formBuilder.group({
      countryCode: ['', Validators.required],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef;
  }

  get f() {
    return this.signUpform.controls;
  }

  getError(field: string, error: string) {
    return this.signUpform.get(field)?.hasError(error) && this.submit;
  }

  async signInWithGoogle() {
    (await this.authService.googleSignUp()).subscribe((res: any) => {
      console.log(res);

      const userData = {
        token: res.data.token,
        user: res.data.isGoogleUser,
      };
      if (res.data && res.data.token && res.data.isGoogleUser) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.sharedService.loggedInUser = res.data.isGoogleUser.userName;
        this.sharedService.loggedInUserChanged.emit(
          res.data.isGoogleUser.userName.split(" ")[0]
        );
        this.dialogRef.close();
      }
    });
  }

  signInwithNumber() {
    this.submit = true;
    if (this.signUpform.valid) {
      const mobileNumber =
        this.signUpform.value.countryCode + this.signUpform.value.mobileNumber;
      this.authService
        .signInWithPhoneNumber(mobileNumber)
        .then((Response: any) => {
          if (Response) {
            this.dialogRef.close(true);
          }
        });
    }
  }

  signInWithEmail() {
    this.dialogRef.close();
    const emailLoginDialogref = this.dialog.open(LoginComponent);
  }
}
