import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { IadminModael } from '../../../models/adminModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent {
  loginForm!: FormGroup;
  adminLogin: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // userName: ['', Validators.required],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      userName:['admin'],
      password:['123456'],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data: IadminModael = this.loginForm.value;
      this.adminService.adminLogin(data).subscribe((res) => {
        const adminData = {
          userName: res.data.admin.userName,
          token: res.data.token,
        };
        if (res.data && res.data.token && res.data.admin) {
          this.adminLogin = true;
          localStorage.setItem('admin', JSON.stringify(adminData));
          this.router.navigateByUrl('admin/dashboard');
        }
      });
    }
  }
}
