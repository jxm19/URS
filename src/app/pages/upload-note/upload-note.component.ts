import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-upload-note',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent],
  templateUrl: './upload-note.component.html',
  styleUrls: ['./upload-note.component.css']
})
export class UploadNoteComponent {
  title: string = '';
  notes: string = '';
}
