import { Component } from '@angular/core';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-instructorhome',
  imports: [ InstructornavbarComponent],
  templateUrl: './instructorhome.component.html',
  styleUrl: './instructorhome.component.css',
  standalone:true
})
export class InstructorhomeComponent {

}
