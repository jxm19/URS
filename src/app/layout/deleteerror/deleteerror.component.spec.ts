import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteerrorComponent } from './deleteerror.component';

describe('DeleteerrorComponent', () => {
  let component: DeleteerrorComponent;
  let fixture: ComponentFixture<DeleteerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
