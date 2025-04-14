import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseannComponent } from './courseann.component';

describe('CourseannComponent', () => {
  let component: CourseannComponent;
  let fixture: ComponentFixture<CourseannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseannComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
