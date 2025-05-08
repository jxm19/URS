import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructornavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructornavbar.component.html',
  styleUrl: './instructornavbar.component.css'
})
export class InstructornavbarComponent {
  isCollapsed = false;

  @Input() instructorName: string = ''; // Receives from parent

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
