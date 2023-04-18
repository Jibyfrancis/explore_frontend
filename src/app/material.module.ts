import { NgModule } from "@angular/core";
import{CommonModule} from '@angular/common'
import{MatInputModule } from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';







@NgModule({
  exports:[
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule


  ]
})
export class MaterialModule{}
