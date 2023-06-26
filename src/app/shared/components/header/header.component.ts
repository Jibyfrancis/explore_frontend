import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/client/component/login/login.component';
import { OtpComponent } from 'src/app/client/component/otp/otp.component';
import { SigninComponent } from 'src/app/client/component/signin/signin.component';
import { UserDetailsComponent } from 'src/app/client/component/user-details/user-details.component';
import { SharedService } from '../../services/shared.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isLoggedIn = false;
  user: any = ""

  constructor(private router: Router, public dialog: MatDialog, private sharedService: SharedService, private auth: AuthServiceService) { }
  ngOnInit() {
    this.sharedService.loggedInUserChanged.subscribe((user) => {
      this.isLoggedIn = true
      this.user = user
    })
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      if (userData !== null) {
        const userDataObj = JSON.parse(userData)
        const name = userDataObj.user.userName
        this.sharedService.loggedInUser = name.split(" ")[0]
        this.user = name.split(" ")[0]
        this.isLoggedIn = true
      }
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  signIn() {
    const dialogRef = this.dialog.open(SigninComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const otpDialogRef = this.dialog.open(OtpComponent)
        otpDialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.dialog.open(UserDetailsComponent)
              .afterClosed().subscribe(result => {
              })
          }
        })
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  get menuItems() {
    if (this.isLoggedIn) {
      return [
        { name: 'Logout' },
        { name: 'Profile' },
        {name:'My Properties'},
        {name:'My Booking'}
      ];
    }
    else {
      return [
        { name: 'Signup' },
        { name: 'Login' },
      ];
    }
  }

  navigateToItem(item: any) {
    if (item.name === 'Signup' || item.name === 'Login') {
      this.signIn()

    }
    if (item.name === 'Logout') {
      this.logout();
    }
    if (item.name === 'Profile') {
      this.profile()
    }
    if(item.name==='My Booking'){
      this.myBooking()
    }
    // else {
    //   this.router.navigate(['/items', item]);
    // }
  }

  trackByFn(index: number, item: any) {
    return item.name;
  }

  hostRequest() {
    if (!this.user) {
      this.signIn()

    } else {
      this.router.navigateByUrl('host-request');

    }


  }

  profile() {
    alert()



  }
  myBooking(){
    this.router.navigateByUrl('booking')
  }

  logout() {
    localStorage.removeItem('user')
    this.isLoggedIn = false
    this.user = ""
    this.router.navigateByUrl('')
  }


}


