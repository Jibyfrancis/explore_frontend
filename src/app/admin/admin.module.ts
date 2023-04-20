import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { AdminLayoutComponent } from './component/layout/adminlayout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';







@NgModule({
  declarations: [
    AdminloginComponent,
    DashboardComponent,
    AdminNavComponent,
    AdminLayoutComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class AdminModule { }
