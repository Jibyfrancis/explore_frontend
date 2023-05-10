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
        id: amenity._id,
        name: amenity.name,
        imageUrl: amenity.imageUrl,
      }));
      this.amenities = new MatTableDataSource(amenities);
      this.showSpinner = true;
    });
  }

  Remove(id: string) {
    this.adminService.removeAmenity(id).subscribe((res: any) => {
      if (res.status === 'Success') {
        const index = this.amenities.data.findIndex(
          (amenity) => amenity._id = id
        );

        if (index !== -1) {
          this.amenities.data.splice(index, 1);
          this.amenities = new MatTableDataSource(this.amenities.data);
        }
      }
    });
  }
}
