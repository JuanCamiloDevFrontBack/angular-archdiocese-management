import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParishedComponent } from './admin-parished.component';

describe('AdminParishedComponent', () => {
  let component: AdminParishedComponent;
  let fixture: ComponentFixture<AdminParishedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminParishedComponent]
    });
    fixture = TestBed.createComponent(AdminParishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
