import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/component/home/home.component';
import { UserLayoutComponent } from './client/component/user-layout.component';
import { HostRequestComponent } from './client/component/host-request/host-request.component';
import { UserAuthGuard } from './client/guard/user-auth.guard';
import { HostPropertyComponent } from './client/component/host-request/host-property/host-property.component';
import { PropertyDetailComponent } from './client/component/property-detail/property-detail.component';
import { AdminComponent } from './admin/admin.component';
import { PaymentSuccessComponent } from './client/component/payment-success/payment-success.component';
import { PaymentCancelComponent } from './client/component/payment-cancel/payment-cancel.component';
import { BookingsComponent } from './client/component/bookings/bookings.component';
import { SearchComponent } from './client/component/search/search.component';
import { ChatComponent } from './client/component/chat/chat.component';
import { ListedPropertiesComponent } from './client/component/host-request/listed-properties/listed-properties.component';


const routes: Routes = [
  { path: '', component:UserLayoutComponent ,
  children:[
    {path:"",component:HomeComponent},
    {path:'host-request',component:HostRequestComponent,canActivate:[UserAuthGuard]},
    {path:'list-property',component:HostPropertyComponent,canActivate:[UserAuthGuard]},
    {path:'property-detail/:id',component:PropertyDetailComponent},
    {path:'success',component:PaymentSuccessComponent,canActivate:[UserAuthGuard]},
    {path:'cancel',component:PaymentCancelComponent,canActivate:[UserAuthGuard]},
    {path:'booking',component:BookingsComponent,canActivate:[UserAuthGuard]},
    {path:'search',component:SearchComponent},
    {path:'chat',component:ChatComponent},
    {path:'listed-property',component:ListedPropertiesComponent}

  ]},
  {path:'admin',component:AdminComponent, loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
