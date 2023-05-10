import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPropertyComponent } from './host-property.component';

describe('HostPropertyComponent', () => {
  let component: HostPropertyComponent;
  let fixture: ComponentFixture<HostPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
