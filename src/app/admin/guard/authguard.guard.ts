import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AadminAuthguardGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminService.isAdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}