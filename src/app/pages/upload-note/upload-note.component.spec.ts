import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNoteComponent } from './upload-note.component';

describe('UploadNoteComponent', () => {
  let component: UploadNoteComponent;
  let fixture: ComponentFixture<UploadNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
