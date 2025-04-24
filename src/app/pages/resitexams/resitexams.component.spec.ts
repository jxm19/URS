import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResitexamsComponent } from './resitexams.component';

describe('ResitexamsComponent', () => {
  let component: ResitexamsComponent;
  let fixture: ComponentFixture<ResitexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResitexamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResitexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
