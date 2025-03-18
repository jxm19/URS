import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorhomeComponent } from './instructorhome.component';

describe('InstructorhomeComponent', () => {
  let component: InstructorhomeComponent;
  let fixture: ComponentFixture<InstructorhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
