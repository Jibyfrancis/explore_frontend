import { Component, OnInit,EventEmitter,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class HomeComponent implements OnInit{
  falocation = faLocationDot
  searchIcon = faMagnifyingGlass
  picker: any
  searchForm!: FormGroup
  breakpoint!: number;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


ngOnInit() {
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 4;
}
onResize(event:any) {
  this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 4;
}
cardclick()
{
  alert()

}

}
