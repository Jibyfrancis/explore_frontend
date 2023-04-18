import { Component } from '@angular/core';
import { WindowService } from './services/window.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  windowRef: any

constructor( private windowService:WindowService){}
  ngOnInit() {
    this.windowRef = this.windowService.windowRef
  }
}
