import { Component } from '@angular/core';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';
import { TestComponent } from '../../layout/test/test.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fchome',
  imports: [FcnavbarComponent, TestComponent, CommonModule],
  templateUrl: './fchome.component.html',
  styleUrl: './fchome.component.css',
  standalone:true

})
export class FchomeComponent {

}
