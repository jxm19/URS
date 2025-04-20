import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-file-added',
  imports: [CommonModule, FormsModule, InstructornavbarComponent],
  templateUrl: './file-added.component.html',
  styleUrl: './file-added.component.css'
})
export class FileAddedComponent {

}
