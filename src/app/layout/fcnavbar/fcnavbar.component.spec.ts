import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcnavbarComponent } from './fcnavbar.component';

describe('FcnavbarComponent', () => {
  let component: FcnavbarComponent;
  let fixture: ComponentFixture<FcnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FcnavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
