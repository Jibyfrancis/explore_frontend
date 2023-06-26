import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginguardGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminService.isAdminLoggedIn()) {
      console.log('navigate');
      this.router.navigate(['/admin']); // redirect to the admin login page
      return false; // allow navigation to the requested route
    } else {
      return true; // do not allow navigation to the requested route
    }
  }
}
