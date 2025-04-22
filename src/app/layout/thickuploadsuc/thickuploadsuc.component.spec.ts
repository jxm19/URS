import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThickuploadsucComponent } from './thickuploadsuc.component';

describe('ThickuploadsucComponent', () => {
  let component: ThickuploadsucComponent;
  let fixture: ComponentFixture<ThickuploadsucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThickuploadsucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThickuploadsucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
