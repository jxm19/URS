import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-instructornavbar',
  imports: [CommonModule],
  templateUrl: './instructornavbar.component.html',
  styleUrl: './instructornavbar.component.css',
  standalone: true
})
export class InstructornavbarComponent {
  isCollapsed = false; // Default state

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Toggle collapse state
  }
}
