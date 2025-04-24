import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamdetailsComponent } from './examdetails.component';

describe('ExamdetailsComponent', () => {
  let component: ExamdetailsComponent;
  let fixture: ComponentFixture<ExamdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
