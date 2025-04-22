import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerrorComponent } from './editerror.component';

describe('EditerrorComponent', () => {
  let component: EditerrorComponent;
  let fixture: ComponentFixture<EditerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
