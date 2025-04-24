import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/layout/thickuploadsuc/thickuploadsuc.component.spec.ts
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
========
import { GradesdetailsComponent } from './gradesdetails.component';

describe('GradesdetailsComponent', () => {
  let component: GradesdetailsComponent;
  let fixture: ComponentFixture<GradesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesdetailsComponent);
>>>>>>>> janaversion:src/app/pages/gradesdetails/gradesdetails.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
