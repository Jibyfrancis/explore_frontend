import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Amenity {
  _id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
})
export class AmenitiesComponent implements OnInit {
  amenities: MatTableDataSource<Amenity> = new MatTableDataSource<Amenity>();
  constructor(private adminService: AdminService) {}
  showSpinner: boolean = true;

  ngOnInit(): void {
    this.adminService.getAllAmenity().subscribe((res: any) => {
      console.log(res);

      const amenities: Amenity[] = res.amenities.map((amenity: Amenity) => ({
        _id: amenity._id,
        name: amenity.name,
        imageUrl: amenity.imageUrl,
      }));
      this.amenities = new MatTableDataSource(amenities);
      console.log(amenities);

      this.showSpinner = true;
    });
  }


  Remove(amenity: Amenity) {

    this.adminService.removeAmenity(amenity._id).subscribe((res: any) => {
      if (res.status === 'Success') {
        const amenities = this.amenities.data.filter((aminity:Amenity)=>{
          return aminity._id !== amenity._id
        })
        this.amenities = new MatTableDataSource(amenities);
        console.log(amenities);

      }
    });
  }
}
