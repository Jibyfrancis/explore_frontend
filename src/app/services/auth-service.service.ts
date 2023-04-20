import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, Auth, } from "@angular/fire/auth"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,} from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  appVerifier: any;
  confirmationResult: any;
  userPhoneNumber:any

  constructor(public fireauth: AngularFireAuth,
    private _route: Router,
    private _http: HttpClient,
    private _auth: Auth) { }

  recaptcha() {
    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {
        console.log(response)
      },
      // 'expired-callback': () => { }
    }, this._auth);
  }

  async signInWithPhoneNumber(phoneNumber: any) {
    this.userPhoneNumber=phoneNumber
    try {
      if (!this.appVerifier) this.recaptcha();
      const confirmationResult = await signInWithPhoneNumber(this._auth, phoneNumber, this.appVerifier);
      this.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch (e) {
      throw (e);
    }
  }

  async verifyOtp(otp: any) {
    try {
      if (!this.appVerifier) this.recaptcha();
      console.log("calling otpvarific");
      console.log(this.confirmationResult);
      const result = await this.confirmationResult.confirm(otp)
      console.log(result);
      const user = result?.user;
      console.log(user);
      return user;
      // return await this.confirmationResult.verify(otp)
    } catch (e) {
      console.log(e);

    }
  }


  googleSignUp() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res: any) => {
      return this._http.post('userGoogleLogin', res.additionalUserInfo?.profile)
    })
  }

  userSignupWithPhoneNumber(userData:any):Observable<any> {
    userData.mobile=this.userPhoneNumber
    return this._http.post('userRegister', userData)
  }

  userLogin(data:any):Observable<any>{
    return this._http.post('userLogin', data)
  }


}
