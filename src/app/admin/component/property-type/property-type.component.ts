import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';

export interface PropertyType {
  _id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css'],
})
export class PropertyTypeComponent {
  propertyTypes: MatTableDataSource<PropertyType> =
    new MatTableDataSource<PropertyType>();
  constructor(private adminService: AdminService) {}
  showSpinner: boolean = true;

  ngOnInit(): void {
    this.adminService.getAllPropertyType().subscribe((res: any) => {
      const property: PropertyType[] = res.propertyType.map(
        (propertyType: PropertyType) => ({
          _id: propertyType._id,
          name: propertyType.name,
          imageUrl: propertyType.imageUrl,
        })
      );
      this.propertyTypes = new MatTableDataSource(property);
      this.showSpinner = true;
    });
  }

  Remove(propertyType: PropertyType) {
    this.adminService
      .removePropertyType(propertyType._id)
      .subscribe((res: any) => {
        if (res.status === 'Success') {
          const updatedPropertyTypes = this.propertyTypes.data.filter(
            (type: PropertyType) => {
              return type._id !== propertyType._id;
            }
          );
          this.propertyTypes = new MatTableDataSource(updatedPropertyTypes);
        }
      });
  }
}
