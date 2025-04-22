import { Component, EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-thickerrordeletesucc',
  imports: [],
  templateUrl: './thickerrordeletesucc.component.html',
  styleUrl: './thickerrordeletesucc.component.css',
  standalone:true


})
export class ThickerrordeletesuccComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
