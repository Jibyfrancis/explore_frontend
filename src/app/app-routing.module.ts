import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/component/home/home.component';
import { UserLayoutComponent } from './client/component/user-layout.component';
import { HostRequestComponent } from './client/component/host-request/host-request.component';
import { UserAuthGuard } from './client/guard/user-auth.guard';
import { HostPropertyComponent } from './client/component/host-request/host-property/host-property.component';

const routes: Routes = [
  { path: '', component:UserLayoutComponent ,
  children:[
    {path:"",component:HomeComponent},
    {path:'host-request',component:HostRequestComponent,canActivate:[UserAuthGuard]},
    {path:'list-property',component:HostPropertyComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
