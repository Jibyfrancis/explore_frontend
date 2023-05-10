import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAmenityComponent } from './add-amenity.component';

describe('AddAmenityComponent', () => {
  let component: AddAmenityComponent;
  let fixture: ComponentFixture<AddAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAmenityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
