import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecFileAddedComponent } from './sec-file-added.component';

describe('SecFileAddedComponent', () => {
  let component: SecFileAddedComponent;
  let fixture: ComponentFixture<SecFileAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecFileAddedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecFileAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
