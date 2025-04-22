import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThickerrorComponent } from './thickerror.component';

describe('ThickerrorComponent', () => {
  let component: ThickerrorComponent;
  let fixture: ComponentFixture<ThickerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThickerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThickerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
