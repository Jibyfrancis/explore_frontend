import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/component/home/home.component';
import { UserLayoutComponent } from './client/component/user-layout.component';


const routes: Routes = [
  { path: '', component:UserLayoutComponent ,
  children:[
    {path:"",component:HomeComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
