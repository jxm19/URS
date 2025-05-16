import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamdetailsScourseannComponent } from './examdetails-scourseann.component';

describe('ExamdetailsScourseannComponent', () => {
  let component: ExamdetailsScourseannComponent;
  let fixture: ComponentFixture<ExamdetailsScourseannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamdetailsScourseannComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamdetailsScourseannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
