import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorExamScheduleComponent } from './instructor-exam-schedule.component';

describe('ExamScheduleComponent', () => {
  let component: InstructorExamScheduleComponent;
  let fixture: ComponentFixture<InstructorExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorExamScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
