import { Component } from '@angular/core';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instructorhome',
  imports: [InstructornavbarComponent,CommonModule,RouterModule],
  templateUrl: './instructorhome.component.html',
  styleUrl: './instructorhome.component.css'
})
export class InstructorhomeComponent {
   // Define courses directly here (no external service needed)
   courses = [
    { code: 'SE302/1', title: 'Software Project Management', instructor: 'Dr. Kristin Surpuhi Benli' },
    { code: 'SE303/1', title: 'Advanced Programming', instructor: 'Dr. Kristin Surpuhi Benli' },
    { code: 'SE304/1', title: 'Database Systems', instructor: 'Dr. Kristin Surpuhi Benli' },
  ];

}
