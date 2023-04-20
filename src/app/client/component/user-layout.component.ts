import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  template: `
    <app-header></app-header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class UserLayoutComponent {}
