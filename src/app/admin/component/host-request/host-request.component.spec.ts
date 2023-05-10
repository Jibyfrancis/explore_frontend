import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRequestComponent } from './host-request.component';

describe('HostRequestComponent', () => {
  let component: HostRequestComponent;
  let fixture: ComponentFixture<HostRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
