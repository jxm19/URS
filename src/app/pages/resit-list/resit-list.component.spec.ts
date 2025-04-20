import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResitListComponent } from './resit-list.component';

describe('ResitListComponent', () => {
  let component: ResitListComponent;
  let fixture: ComponentFixture<ResitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResitListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
