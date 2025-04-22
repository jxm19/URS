import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thickerror',
  imports: [],
  templateUrl: './thickerror.component.html',
  styleUrl: './thickerror.component.css',
  standalone:true

})
export class ThickerrorComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
