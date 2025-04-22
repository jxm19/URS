import { Component ,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-editerror',
  imports: [],
  templateUrl: './editerror.component.html',
  styleUrl: './editerror.component.css',
  standalone:true

})
export class EditerrorComponent {

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
