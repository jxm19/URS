import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAddedComponent } from './file-added.component';

describe('FileAddedComponent', () => {
  let component: FileAddedComponent;
  let fixture: ComponentFixture<FileAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAddedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
