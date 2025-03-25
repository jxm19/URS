import { Component } from '@angular/core';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fchome',
  imports: [FcnavbarComponent, CommonModule],
  templateUrl: './fchome.component.html',
  styleUrl: './fchome.component.css',
  standalone:true

})
export class FchomeComponent {

}
