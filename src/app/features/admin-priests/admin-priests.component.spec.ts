import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPriestsComponent } from './admin-priests.component';

describe('AdminPriestsComponent', () => {
  let component: AdminPriestsComponent;
  let fixture: ComponentFixture<AdminPriestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminPriestsComponent]
    });
    fixture = TestBed.createComponent(AdminPriestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
