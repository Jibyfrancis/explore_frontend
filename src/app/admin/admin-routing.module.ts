import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminLayoutComponent } from './component/layout/adminlayout.component';
import { AadminAuthguardGuard } from './guard/authguard.guard';
import { AdminLoginguardGuard } from './guard/admin-loginguard.guard';
import { UserManagementComponent } from './component/user-management/user-management.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HostRequestComponent } from './component/host-request/host-request.component';
import { AmenitiesComponent } from './component/amenities/amenities.component';
import { AddAmenityComponent } from './component/amenities/add-amenity/add-amenity.component';
import { PropertyTypeComponent } from './component/property-type/property-type.component';
import { AddPropertyComponent } from './component/property-type/add-property/add-property.component';
import { ListedPropertyComponent } from './component/listed-property/listed-property.component';


// const routes: Routes = [
//   {

//     children: [
//       {
//         path: 'login',
//         component: AdminloginComponent,
//         canActivate: [AdminLoginguardGuard],
//       },
//       {
//         path: 'dashboard',
//         component: AdminNavComponent,
//         canActivate: [AadminAuthguardGuard],
//         children: [
//           { path: 'users', component: UserManagementComponent },
//           { path: 'dashboard', component: DashboardComponent },
//           { path: 'host-request', component: HostRequestComponent },
//           { path: 'amenities', component: AmenitiesComponent, },
//           { path: 'add-amenity', component: AddAmenityComponent },
//           {path:'property-type',component:PropertyTypeComponent},
//           {path:'add-property-type',component:AddPropertyComponent},
//           {path:'property-list',component:ListedPropertyComponent}


//         ],
//       },
//     ],
//   },
// ];

const routes: Routes = [
  { path: 'login', component: AdminloginComponent, canActivate: [AdminLoginguardGuard] },
  {
    path: '', component: AdminNavComponent, canActivate: [AadminAuthguardGuard],
    children: [
      { path: 'users', component: UserManagementComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'host-request', component: HostRequestComponent },
      { path: 'amenities', component: AmenitiesComponent, },
      { path: 'add-amenity', component: AddAmenityComponent }, { path: 'property-type', component: PropertyTypeComponent },
      { path: 'add-property-type', component: AddPropertyComponent },
      { path: 'property-list', component: ListedPropertyComponent }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
