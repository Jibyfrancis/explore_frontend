import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/client/component/login/login.component';
import { OtpComponent } from 'src/app/client/component/otp/otp.component';
import { SigninComponent } from 'src/app/client/component/signin/signin.component';
import { UserDetailsComponent } from 'src/app/client/component/user-details/user-details.component';
import { SharedService } from '../../services/shared.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  isLoggedIn = false;
  user: any = ""


  constructor(private router: Router, public dialog: MatDialog, private sharedService: SharedService) { }
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
        this.user=name.split(" ")[0]
        this.isLoggedIn = true
        console.log(this.user);

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
          console.log('otpclosed');
          if (result === true) {
            this.dialog.open(UserDetailsComponent)
              .afterClosed().subscribe(result => {
                console.log('userdetailsclosed');
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
        { name: 'Log out' },
        { name: 'Profile', link: '/profile' }
      ];
    }
    else {
      return [
        { name: 'Sign up' },
        { name: 'Log in' },
      ];
    }
  }

  navigateToItem(item: any) {
    if (item.name === 'Sign up' || item.name === 'Log in') {
      this.signIn()

    } else {

      this.router.navigate(['/items', item]);
    }
    if(item.name==='Log out'){
      this.logout();
    }
  }

  trackByFn(index: number, item: any) {
    return item.name;
  }



  logout() {
    localStorage.removeItem('user')
    this.isLoggedIn=false
    this.user=""

  }

}


