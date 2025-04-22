import { Component } from '@angular/core';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';
import { CommonModule } from '@angular/common';
import { DeleteerrorComponent } from '../../layout/deleteerror/deleteerror.component';



@Component({
  selector: 'app-delete-confirmation',
  imports: [FcnavbarComponent, CommonModule, DeleteerrorComponent],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css',
  standalone:true

})
export class DeleteConfirmationComponent {

}
