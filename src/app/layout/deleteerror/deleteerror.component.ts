import { Component ,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-deleteerror',
  imports: [],
  templateUrl: './deleteerror.component.html',
  styleUrl: './deleteerror.component.css',
  standalone:true

})
export class DeleteerrorComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
