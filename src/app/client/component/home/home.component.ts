import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faLocationDot,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { PropertyInterface } from '../../../models/propertyModel';
import { Route, Router } from '@angular/router';
import { Feature, MapboxServiceService } from 'src/app/services/mapbox-service.service';

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
  geometry: any;
  addresses: string[] = [];
  lat!: any;
  long!: any;
  currentDate!: Date
  endDate!: Date
  selectedAddress!: string

  constructor(private userService: UserService, private router: Router, private mapboxService: MapboxServiceService,) {
    this.currentDate = new Date();
    this.endDate = new Date()
    this.endDate.setDate(this.currentDate.getDate() + 1);
  }

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

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm).subscribe((features: Feature[]) => {
          console.log(features);
          this.addresses = features.map((feat) => feat.place_name);
          this.geometry = features.map((feat) => feat.geometry);
          console.log(this.geometry[0].coordinates);
          this.lat = this.geometry[0].coordinates[1];
          this.long = this.geometry[0].coordinates[0];

        });
      console.log(this.addresses);

    } else {
      this.addresses = [];
    }
  }
  onSelect(address: string) {
    console.log(address);
    this.selectedAddress = address;
    console.log(this.lat, this.long);
    this.addresses = [];

  }
  searchProperty() {
    console.log(this.selectedAddress);
    // console.log(this.range.value);
    console.log(this.currentDate);
    console.log(this.endDate);
    const data = {
      address: this.selectedAddress,
      from: this.currentDate,
      to: this.endDate
    }
    this.userService.searchProperty(data)


    // this.router.navigateByUrl('search')


  }
}

