import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/client/services/user.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-listed-properties',
  templateUrl: './listed-properties.component.html',
  styleUrls: ['./listed-properties.component.css'],
})
export class ListedPropertiesComponent implements OnInit {
  displayedColumns: string[] = [
    'propertyName',
    'propertyAddress',
    'image',
    'amount',
    'action',
  ];

  dataSource!: any[]
  propertyId: any = ''
  userId!: string
  response: boolean = false

  constructor(private _userService: UserService, public dialog: MatDialog) { }
  ngOnInit() {

    const userId = JSON.parse(localStorage.getItem('user') ?? "")
    console.log(userId.user._id);
    this.userId = userId.user._id
    this._userService.getPropertyByHostId(userId.user._id).subscribe((res: any) => {
      console.log(res);

      this.dataSource = res.property.map((property: any) => ({
        _id: property._id,
        propertyName: property.name,
        propertyAddress: property.address,
        image: property.imageUrl[0],
        amount: property.price

      }))
    })

  }

  showButton: boolean = true;
  bookingStatus!: string;

  updateProId(event: any) {
    console.log('frpmeditttt');

    this.propertyId = ''
  }

  edit(id: any) {
    this.propertyId = id
    // this._userService.editProperty(id)
    console.log(this.propertyId);
  }

  remove(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      width: '350px',
      height: '200px',
      text: 'Remove',
    };
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this.response = true
        this._userService.removeProperty(id).subscribe((res: any) => {
          if (res.status === 'Success') {
            this._userService.getPropertyByHostId(this.userId).subscribe((res: any) => {
              this.response = false
              this.dataSource = res.property.map((property: any) => ({
                _id: property._id,
                propertyName: property.name,
                propertyAddress: property.address,
                image: property.imageUrl[0],
                amount: property.price

              }))
            })
          }
        })
      }
    })

  }
}
