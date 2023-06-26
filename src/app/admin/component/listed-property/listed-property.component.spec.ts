import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedPropertyComponent } from './listed-property.component';

describe('ListedPropertyComponent', () => {
  let component: ListedPropertyComponent;
  let fixture: ComponentFixture<ListedPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
