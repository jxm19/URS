import { Component } from '@angular/core';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fchome',
  imports: [FcnavbarComponent, CommonModule],
  templateUrl: './fchome.component.html',
  styleUrl: './fchome.component.css',
  standalone:true

})
export class FchomeComponent {
SecretaryName: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.SecretaryName = localStorage.getItem('SecretaryName') || '';
  }
   
  
}
