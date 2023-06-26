import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';

export interface User {
  _id: number;
  userName: string;
  email: string;
  mobile: string;
  status: boolean;
  isActive:boolean,
  isHosted:boolean


}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users!: MatTableDataSource<User>;


  ngOnInit(): void {
    this.adminService.getAllUser().subscribe((res) => {
      console.log(res.users);
      const users: User[] = res.users.map((user:User) => ({
        id: user._id,
        username: user.userName,
        email: user.email,
        phone: user.mobile,
        status: user.isActive,
        isHosted: user.isHosted,

      }));
      this.users = new MatTableDataSource(users);
      // console.log(this.users);
    });
  }


  constructor(private adminService: AdminService) {


  }
  updateUserStatus(id:any,status:any){
    this.adminService.changeUserStatus(id,status).subscribe((res)=>{

    })



  }

}
