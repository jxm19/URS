import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FchomeComponent } from './fchome.component';

describe('FchomeComponent', () => {
  let component: FchomeComponent;
  let fixture: ComponentFixture<FchomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FchomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FchomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
