import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSecComponent } from './upload-sec.component';

describe('UploadSecComponent', () => {
  let component: UploadSecComponent;
  let fixture: ComponentFixture<UploadSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
