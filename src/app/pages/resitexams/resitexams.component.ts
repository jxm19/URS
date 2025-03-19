import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';
import { PreviousComponent } from '../../layout/previous/previous.component';
import { UpcomingComponent } from '../../layout/upcoming/upcoming.component';

@Component({
  selector: 'app-resitexams',
  imports: [StudentnavbarComponent,CommonModule,PreviousComponent,UpcomingComponent],
  templateUrl: './resitexams.component.html',
  styleUrl: './resitexams.component.css',
  standalone:true
})
export class ResitexamsComponent {

}
