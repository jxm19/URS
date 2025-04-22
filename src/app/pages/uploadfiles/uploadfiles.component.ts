import { Component } from '@angular/core';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploadfiles',
  imports: [FcnavbarComponent, CommonModule],
  templateUrl: './uploadfiles.component.html',
  styleUrl: './uploadfiles.component.css',
  standalone:true

})
export class UploadfilesComponent {

}
