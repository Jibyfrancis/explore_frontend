import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faLocationDot,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { PropertyInterface } from '../../../models/propertyModel';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  falocation = faLocationDot;
  searchIcon = faMagnifyingGlass;
  picker: any;
  searchForm!: FormGroup;
  breakpoint!: number;
  properties: PropertyInterface[] = [];
  propertyImageUrls: any[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 768 ? 1 : 4;
    this.userService.getAllProperty().subscribe((res) => {
      console.log(res);
      this.properties = res.properties.map((property: PropertyInterface) => ({
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
    });
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 768 ? 1 : 4;
  }

  onPropertyClick(id: string) {
    this.router.navigateByUrl(`property-detail/${id}`);
  }
}
