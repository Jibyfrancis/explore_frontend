import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div class="admin-container">
    <router-outlet></router-outlet>
    </div>
  `,
})
export class AdminLayoutComponent {}
