import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Add this import
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-instructorhome',
  standalone: true,
  imports: [CommonModule, InstructornavbarComponent,RouterModule],
  templateUrl: './instructorhome.component.html',
  styleUrls: ['./instructorhome.component.css'],
})
export class InstructorhomeComponent {
  // Define courses directly here (no external service needed)
  courses = [
    { code: 'SE302/1', title: 'Software Project Management', instructor: 'Dr. Kristin Surpuhi Benli' },
    { code: 'SE303/1', title: 'Advanced Programming', instructor: 'Dr. Kristin Surpuhi Benli' },
    { code: 'SE304/1', title: 'Database Systems', instructor: 'Dr. Kristin Surpuhi Benli' },
  ];
}