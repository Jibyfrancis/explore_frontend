import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { AdminLayoutComponent } from './component/layout/adminlayout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { HostRequestComponent } from './component/host-request/host-request.component';
import { AmenitiesComponent } from './component/amenities/amenities.component';
import { AddAmenityComponent } from './component/amenities/add-amenity/add-amenity.component';
import { PropertyTypeComponent } from './component/property-type/property-type.component';
import { AddPropertyComponent } from './component/property-type/add-property/add-property.component';




@NgModule({
  declarations: [
    AdminloginComponent,
    DashboardComponent,
    AdminNavComponent,
    AdminLayoutComponent,
    UserManagementComponent,
    HostRequestComponent,
    AmenitiesComponent,
    AddAmenityComponent,
    PropertyTypeComponent,
    AddPropertyComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ],



})
export class AdminModule {}
