import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminLayoutComponent } from './component/layout/adminlayout.component';

const routes: Routes = [
{path:"admin",component:AdminLayoutComponent,children:[
  { path:'',component:AdminloginComponent},
  { path: "dashboard", component:  AdminNavComponent},


]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
