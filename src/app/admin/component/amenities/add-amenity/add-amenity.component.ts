import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-add-amenity',
  templateUrl: './add-amenity.component.html',
  styleUrls: ['./add-amenity.component.css'],
})
export class AddAmenityComponent implements OnInit {
  amenityForm!: FormGroup;
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
    this.amenityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/)]],
      image: [null, Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    if (this.amenityForm.valid) {
      const formData = new FormData();
      formData.append('name', this.amenityForm.get('name')?.value);
      formData.append('image', this.amenityForm.get('image')?.value);
      console.log(formData);

      this.adminServices.addAmenity(formData).subscribe((res: any) => {
        if (res.status === 'Success') {
          this.amenityForm.reset();
          this.url=""
          this.showSnackbar = true;
          this.snackbarMessage = 'Amenity added successfully!';
          this.openSnackBar(this.snackbarMessage, this.snackbarValue);
        }
        console.log(res);
      });
    }
    // console.log(this.amenityForm);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
        this.amenityForm.patchValue({
          image: file,
        });
      };
    }
  }
  closeSnackbar() {
    this.showSnackbar = false;
  }
}
