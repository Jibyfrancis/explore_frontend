import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';

export interface Property {
  _id: string,
  name: string,
  imageUrl: string
}


@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrls: ['./property-type.component.css']
})
export class PropertyTypeComponent {
  propertyType!: MatTableDataSource<Property>
  constructor(private adminService: AdminService) { }
  showSpinner: boolean = true

  ngOnInit(): void {
    this.adminService.getAllPropertyType().subscribe((res: any) => {
      console.log(res);

      const property: Property[] = res.propertyType.map((propertyType: Property) => ({
        id: propertyType._id,
        name: propertyType.name,
        imageUrl: propertyType.imageUrl
      }))
      this.propertyType = new MatTableDataSource(property)
      this.showSpinner = true

    })
  }

  Remove(id: string) {
    console.log(id);

  }

}
