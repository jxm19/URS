import { Component, Input } from '@angular/core';  // Import Input
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fcnavbar',
  imports: [CommonModule],
  templateUrl: './fcnavbar.component.html',
  styleUrls: ['./fcnavbar.component.css'],  // Corrected this from 'styleUrl' to 'styleUrls'
  standalone: true
})
export class FcnavbarComponent {
  @Input() secretaryName: string = '';  // Input decorator added

  isCollapsed = false;  // Default state

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;  // Toggle collapse state
  }
}
