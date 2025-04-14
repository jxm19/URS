import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-fcnavbar',
  imports: [CommonModule],
  templateUrl: './fcnavbar.component.html',
  styleUrl: './fcnavbar.component.css',
  standalone:true
})
export class FcnavbarComponent implements OnInit {
  isCollapsed = false;

  ngOnInit() {
    this.autoCollapseSidebar(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.autoCollapseSidebar(event.target.innerWidth);
  }

  autoCollapseSidebar(width: number) {
    this.isCollapsed = width < 768; // Collapse on small screens
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
