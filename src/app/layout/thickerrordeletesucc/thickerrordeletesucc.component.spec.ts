import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThickerrordeletesuccComponent } from './thickerrordeletesucc.component';

describe('ThickerrordeletesuccComponent', () => {
  let component: ThickerrordeletesuccComponent;
  let fixture: ComponentFixture<ThickerrordeletesuccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThickerrordeletesuccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThickerrordeletesuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
