import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentnavbar',
  imports: [CommonModule],
  templateUrl: './studentnavbar.component.html',
  styleUrl: './studentnavbar.component.css',
  standalone: true
})
export class StudentnavbarComponent {
  isCollapsed = false; // Default state

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Toggle collapse state
  }
  
}
