import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesdetailsComponent } from './gradesdetails.component';

describe('GradesdetailsComponent', () => {
  let component: GradesdetailsComponent;
  let fixture: ComponentFixture<GradesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
