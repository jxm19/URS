import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thickuploadsuc',
  imports: [],
  templateUrl: './thickuploadsuc.component.html',
  styleUrl: './thickuploadsuc.component.css', 
  standalone:true
})
export class ThickuploadsucComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
