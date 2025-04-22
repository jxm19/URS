import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThickerrordeletesuccComponent } from '../../layout/thickerrordeletesucc/thickerrordeletesucc.component';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';


@Component({
  selector: 'app-delete-successful',
  imports: [FcnavbarComponent, CommonModule, ThickerrordeletesuccComponent],
  templateUrl: './delete-successful.component.html',
  styleUrl: './delete-successful.component.css',
  standalone:true

})
export class DeleteSuccessfulComponent {

}
