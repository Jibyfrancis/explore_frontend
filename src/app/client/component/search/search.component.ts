import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import { PropertyInterface } from 'src/app/models/propertyModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  propertyTypes: any[] = []
  breakpoint!: number;
  properties: PropertyInterface[] = [];
  propertyImageUrls: any[] = [];
  constructor(private adminService: AdminService, private router:Router, private userService:UserService) { }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 768 ? 1 : 4;
    this.adminService.getAllPropertyType().subscribe((res: any) => {
      console.log(res);
      this.propertyTypes = res.propertyType.map((property: any) => ({
        name: property.name
      }))

      this.userService.searchResults$.subscribe((result:any) => {

        this.properties = result.propertySearch.map((property: PropertyInterface) => ({
          _id: property._id,
          name: property.name,
          description: property.description,
          roomType: property.roomType,
          location: {
            lat: property.location?.lat,
            long: property.location?.long,
          },
          address: {
            address: property.address?.address,
          },
          price: property.price,
          guest: property.guest,
          bedroom: property.bedroom,
          bathrooms: property.bathrooms,
          kitchen: property.kitchen,
          balcony: property.balcony,
          amenities: property.amenities,
          userId: property.userId,
          imageUrl: property.imageUrl.map((url) => ({ url })),
        }));
        console.log(this.propertyImageUrls);

      });

    })
  }
  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 768 ? 1 : 4;
  }
  onPropertyClick(id: string) {
    this.router.navigateByUrl(`property-detail/${id}`);
  }
}
