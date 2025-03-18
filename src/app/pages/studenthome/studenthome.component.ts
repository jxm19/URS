import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';

@Component({
  selector: 'app-studenthome',
  imports: [StudentnavbarComponent],
  templateUrl: './studenthome.component.html',
  styleUrl: './studenthome.component.css',
  standalone:true
})
export class StudenthomeComponent {

}
