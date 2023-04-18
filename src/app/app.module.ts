import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './component/signin/signin.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';


import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/enviroments/environment';
import { HttpClientModule,HTTP_INTERCEPTORS,HttpClientXsrfModule} from '@angular/common/http';
import { InterceptorHttpInterceptor } from './interceptor/interceptor-http.interceptor';
import { OtpComponent } from './component/otp/otp.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { LoginComponent } from './component/login/login.component';

// import firebase from 'firebase/compat/app';
// firebase.initializeApp(environment.firebaseConfig);





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    OtpComponent,
    UserDetailsComponent,
    LoginComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    HttpClientModule,
    HttpClientXsrfModule,
    AngularFireAuthModule,
    // AngularFirestoreModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass:InterceptorHttpInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
