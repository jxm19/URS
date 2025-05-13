import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component'; // ✅ Import the navbar component

@Component({
  selector: 'app-fchome',
  standalone: true,
  imports: [CommonModule, FcnavbarComponent], // ✅ Include it here
  templateUrl: './fchome.component.html',
  styleUrls: ['./fchome.component.css']
})
export class FchomeComponent implements OnInit {
  secretaryName: string = '';

  ngOnInit(): void {
    this.secretaryName = localStorage.getItem('secretaryName') || 'Unknown Secretary';
  }
}
