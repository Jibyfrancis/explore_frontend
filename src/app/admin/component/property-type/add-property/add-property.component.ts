import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  propertyType!: FormGroup;
  url: any;
  showSnackbar: boolean = false;
  snackbarMessage: string = '';
  snackbarValue: string = 'ok';
  constructor(
    private formBuilder: FormBuilder,
    private adminServices: AdminService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.propertyType = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/)]],
      image: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    if (this.propertyType.valid) {
      const formData = new FormData();
      formData.append('name', this.propertyType.get('name')?.value);
      formData.append('image', this.propertyType.get('image')?.value);
      console.log(formData);

      this.adminServices.addPropertyType(formData).subscribe((res: any) => {
        if (res.status === 'Success') {
          this.propertyType.reset();
          this.url=""
          this.showSnackbar = true;
          this.snackbarMessage = 'Amenity added successfully!';
          this.openSnackBar(this.snackbarMessage, this.snackbarValue);
        }
        console.log(res);
      });
    }
    console.log(this.propertyType);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
        this.propertyType.patchValue({
          image: file,
        });
      };
    }
  }
  closeSnackbar() {
    this.showSnackbar = false;
  }
}

