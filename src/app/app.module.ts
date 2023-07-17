import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './client/component/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './client/component/signin/signin.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/enviroments/environment';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { InterceptorHttpInterceptor } from './interceptor/interceptor-http.interceptor';
import { ErrorHandlingInterceptor } from './interceptor/error-handling.interceptor';
import { LottiePlayer } from '@lottiefiles/lottie-player';
import { LottieModule } from 'ngx-lottie';

import { OtpComponent } from './client/component/otp/otp.component';
import { UserDetailsComponent } from './client/component/user-details/user-details.component';
import { LoginComponent } from './client/component/login/login.component';
import { AdminModule } from './admin/admin.module';
import { UserLayoutComponent } from './client/component/user-layout.component';
import { HostRequestComponent } from './client/component/host-request/host-request.component';
import { HostPropertyComponent } from './client/component/host-request/host-property/host-property.component';
import { ImagesliderComponent } from './client/component/home/imageslider/imageslider.component';
import { PropertyDetailComponent } from './client/component/property-detail/property-detail.component';
import { PaymentSuccessComponent } from './client/component/payment-success/payment-success.component';
import { PaymentCancelComponent } from './client/component/payment-cancel/payment-cancel.component';
import { BookingsComponent } from './client/component/bookings/bookings.component';
import { CancelBookingComponent } from './client/component/bookings/cancel-booking/cancel-booking.component';
import { SearchComponent } from './client/component/search/search.component';
import { ChatComponent } from './client/component/chat/chat.component';
import { ListedPropertiesComponent } from './client/component/host-request/listed-properties/listed-properties.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { WaitingComponent } from './shared/components/waiting/waiting.component';


// export function playerFactory() { // add this line
//   return import('lottie-web'); // add this line
// } // add this line



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    OtpComponent,
    UserDetailsComponent,
    LoginComponent,
    UserLayoutComponent,
    HostRequestComponent,
    HostPropertyComponent,
    ImagesliderComponent,
    PropertyDetailComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    BookingsComponent,
    CancelBookingComponent,
    SearchComponent,
    ChatComponent,
    ListedPropertiesComponent,
    AlertComponent,
    WaitingComponent


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
    AdminModule,






  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpInterceptor,
      multi: true,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorHandlingInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
