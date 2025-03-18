import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fcnavbar',
  imports: [CommonModule],
  templateUrl: './fcnavbar.component.html',
  styleUrl: './fcnavbar.component.css',
  standalone:true
})
export class FcnavbarComponent {
  isCollapsed = false; // Default state

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Toggle collapse state
  }
}
