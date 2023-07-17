import { Component, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AdminService } from 'src/app/admin/services/admin.service';
import { UserService } from 'src/app/client/services/user.service';
import {
  MapboxServiceService,
  Feature,
} from 'src/app/services/mapbox-service.service';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';



export interface Amenity {
  _id: string;
  name: string;
  imageUrl: string;
}
export interface TypeOfProperty {
  _id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-host-property',
  templateUrl: './host-property.component.html',
  styleUrls: ['./host-property.component.css'],
})
export class HostPropertyComponent implements OnInit {
  @Input() PropertyId: any
  @Output() toPlist = new EventEmitter<string>()

  @ViewChild(MatStepper)
  property!: any
  stepper!: MatStepper;
  upload = faUpload
  currentUserId: string = ''
  propertyTypes!: TypeOfProperty[];
  amenities!: Amenity[];
  selectedAmenity: any;
  addresses: string[] = [];
  selectedAddress!: string
  selectedType!: TypeOfProperty;
  photoFormGroup!: FormGroup;
  propertyForm!: FormGroup
  propertyFormGroup!: FormGroup;
  amenityFormGroup!: FormGroup
  selectedAmenities: any[] = [];
  deletePhoto:any[]=[]
  geometry: any;
  lat!: any;
  long!: any;
  photoUrls: any[] = [];
  imageUrls: any = [];
  ids: string = ''

  constructor(
    private _formBuilder: FormBuilder,
    private adminService: AdminService,
    private mapboxService: MapboxServiceService,
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    // this.userService.propertyId$.subscribe((id: string) => { this.ids = id })
    if (this.PropertyId) {
      this.userService.getPropertyById(this.PropertyId).subscribe((data: any) => {
        console.log(data);

        this.property = data.property[0]
        // console.log(this.property);
        // for(let key in this.property){
        //   console.log(key);
        // }
        this.lat = this.property.location.lat
        this.long = this.property.location.long
        this.selectedAddress = this.property.address
        this.selectedAmenities = this.property.amenitydetails.map((data: Amenity) => data._id)
        this.imageUrls = [...this.property.imageUrl]
        // console.log(this.imageUrls);
        this.propertyform()
        this.propertygroupform()
        this.setphoto()
      })
    }
    else {
      console.log('noidd');

      // this.propertyform()
      // this.propertygroupform()
      // this.setphoto()
      this.propertyForm = this._formBuilder.group({
        name: [""],
        description: [''],
      });

      this.propertyFormGroup = this._formBuilder.group({
        roomType: ['',],
        address: [this.selectedAddress],
        location: [
          { lat: this.lat, long: this.long },
        ],
        price: ['',],
        guest: ['',],
        bedroom: ['',],
        bathrooms: ['',],
        kitchen: ['',],
        balcony: ['',],
      });
    }

    if (data) {
      const userData = JSON.parse(data);
      const userId = userData?.user._id;
      this.currentUserId = userId
    }

    this.photoFormGroup = this._formBuilder.group({
      amenities: [this.selectedAmenities],
      photos: [this.photoUrls,],
    });

    this.adminService.getAllAmenity().subscribe((res: any) => {
      console.log(res);
      this.amenities = res.amenities;
    });

    this.adminService.getAllPropertyType().subscribe((res: any) => {
      this.propertyTypes = res.propertyType;
    });


    // this.propertyForm = this._formBuilder.group({
    //   name: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    //   description: ['',Validators.required],
    // });


    // this.propertyFormGroup = this._formBuilder.group({
    //   roomType: ['',],
    //   address: [this.selectedAddress],
    //   location: [
    //     { lat: this.lat, long: this.long },
    //   ],
    //   price: ['',],
    //   guest: ['',],
    //   bedroom: ['',],
    //   bathrooms: ['',],
    //   kitchen: ['',],
    //   balcony: ['',],
    // });

    // this.propertyFormGroup = this._formBuilder.group({
    //   roomType: ['',Validators.required],
    //   address:[this.selectedAddress],
    //   location: [
    //     { lat: this.lat, long: this.long },
    //     Validators.required],
    //   price: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    //   guest: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    //   bedroom: ['',Validators.required],
    //   bathrooms: ['',Validators.required],
    //   kitchen: ['',Validators.required],
    //   balcony: ['',Validators.required],
    // });


    this.amenityFormGroup = this._formBuilder.group({
      amenities: this._formBuilder.array([]),
    });
  }


  propertyform() {
    console.log(this.property.name);

    this.propertyForm = this._formBuilder.group({
      name: [this.property ? this.property.name : ""],
      description: [this.property ? this.property.description : ''],
    });
  }
  propertygroupform() {
    this.propertyFormGroup = this._formBuilder.group({
      roomType: [this.property ? this.property.roomType : '',],
      address: [this.selectedAddress],
      location: [
        { lat: this.lat, long: this.long },
      ],
      price: [this.property ? this.property.price : '',],
      guest: [this.property ? this.property.guest : '',],
      bedroom: [this.property ? this.property.bedroom : '',],
      bathrooms: [this.property ? this.property.bathrooms : '',],
      kitchen: [this.property ? this.property.kitchen : '',],
      balcony: [this.property ? this.property.balcony : '',],
    });
  }


  photosLengthValidator(formGroup: FormGroup) {
    const photos = formGroup.get('photos')?.value;
    if (photos.length < 5) {
      return { photosLength: true };
    }
    return null;
  }

  onAmenityChange(event: any, amenityId: any) {
    if (event.checked) {
      this.selectedAmenities.push(amenityId);
    } else {
      const index = this.selectedAmenities.indexOf(amenityId);
      if (index !== -1) {
        this.selectedAmenities.splice(index, 1);
      }
    }
  }

  one() {
    console.log(this.selectedAmenities);
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          console.log(features);
          this.addresses = features.map((feat) => feat.place_name);
          this.geometry = features.map((feat) => feat.geometry);
          console.log(this.geometry[0].coordinates);
          this.lat = this.geometry[0].coordinates[1];
          this.long = this.geometry[0].coordinates[0];
          this.propertyFormGroup.get('location')?.setValue({
            lat: this.lat,
            long: this.long,
          });
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string) {
    console.log(address);
    this.selectedAddress = address;
    this.propertyFormGroup.patchValue({
      address: this.selectedAddress
    })
    console.log(this.lat, this.long);
    this.addresses = [];

  }

  onFileChange(event: any) {
    // this.imageUrls = []
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    for (let i = 0; i < selectedFiles.length; i++) {
      const fileReader = new FileReader();
      const file = selectedFiles[i];
      this.photoUrls.push(file)
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const dataUrl = fileReader.result as string;
        this.imageUrls?.push(dataUrl);
        this.photoFormGroup.get('photos')?.setValue(this.imageUrls);
      };
    }
  }

  setphoto() {
    this.photoFormGroup.get('photos')?.setValue(this.imageUrls);
  }
  removePhoto(photoUrl: string): void {
    console.log(photoUrl);
    this.deletePhoto.push(photoUrl)

    this.imageUrls = this.imageUrls.filter((url: string) => url !== photoUrl);
    console.log(this.imageUrls);

  }


  submit() {
    console.log(this.propertyFormGroup.value);
    const formData = new FormData();
    formData.append('name', this.propertyForm.get('name')?.value);
    formData.append('description', this.propertyForm.get('description')?.value);
    formData.append('roomType', this.propertyFormGroup.get('roomType')?.value);
    formData.append('location', JSON.stringify(this.propertyFormGroup.get('location')?.value));
    formData.append('address', JSON.stringify(this.propertyFormGroup.get('address')?.value))
    formData.append('price', this.propertyFormGroup.get('price')?.value);
    formData.append('guest', this.propertyFormGroup.get('guest')?.value);
    formData.append('bedroom', this.propertyFormGroup.get('bedroom')?.value);
    formData.append('bathrooms', this.propertyFormGroup.get('bathrooms')?.value);
    formData.append('kitchen', this.propertyFormGroup.get('kitchen')?.value);
    formData.append('balcony', this.propertyFormGroup.get('balcony')?.value);
    formData.append('amenities', JSON.stringify(this.selectedAmenities));
    formData.append('userId', this.currentUserId)

    const photos = this.photoUrls
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }
    this.userService.hostNewproperty(formData).subscribe((res) => {
      this.photoUrls = []
      this.imageUrls = [];
      this.selectedAmenities = [];
      this.addresses = [];
      console.log(res);
    });
  }
  update() {
    console.log('updateeee');
    console.log(this.propertyFormGroup.value);
    const formData = new FormData();
    formData.append('proId',this.PropertyId)
    formData.append('name', this.propertyForm.get('name')?.value);
    formData.append('description', this.propertyForm.get('description')?.value);
    formData.append('roomType', this.propertyFormGroup.get('roomType')?.value);
    formData.append('location', JSON.stringify(this.propertyFormGroup.get('location')?.value));
    formData.append('address', JSON.stringify(this.propertyFormGroup.get('address')?.value))
    formData.append('price', this.propertyFormGroup.get('price')?.value);
    formData.append('guest', this.propertyFormGroup.get('guest')?.value);
    formData.append('bedroom', this.propertyFormGroup.get('bedroom')?.value);
    formData.append('bathrooms', this.propertyFormGroup.get('bathrooms')?.value);
    formData.append('kitchen', this.propertyFormGroup.get('kitchen')?.value);
    formData.append('balcony', this.propertyFormGroup.get('balcony')?.value);
    formData.append('amenities', JSON.stringify(this.selectedAmenities));
    formData.append('userId', this.currentUserId)
    formData.append('deleteimg',JSON.stringify(this.deletePhoto))
    const updateimage=this.imageUrls.filter((urls:any)=> !urls.startsWith('data:'))

    formData.append('imageurls', JSON.stringify(updateimage))

    const photos = this.photoUrls
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }
    console.log(formData);

    this.userService.editProperty(formData).subscribe((res: any) => {

      this.toPlist.emit("")
      this.photoUrls = []
      this.imageUrls = [];
      this.deletePhoto=[]
      this.selectedAmenities = [];
      this.addresses = [];
      this.router.navigateByUrl('listed-property')
      console.log(res);
    });

  }
  updatePId() {
    console.log('emitting');
    this.toPlist.emit("")
  }

}

