import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSuccessfulComponent } from './delete-successful.component';

describe('DeleteSuccessfulComponent', () => {
  let component: DeleteSuccessfulComponent;
  let fixture: ComponentFixture<DeleteSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
