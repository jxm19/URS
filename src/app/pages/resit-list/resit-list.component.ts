import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-resit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent],
  templateUrl: './resit-list.component.html',
  styleUrls: ['./resit-list.component.css']
})
export class ResitListComponent {
  searchText = '';
  students = [
    { id: 1, courseCode: 'SE/489', studentId: '21789300', name: 'Sarah Alhalaki', grade: 'FF' },
    { id: 2, courseCode: 'SE/109', studentId: '21789300', name: 'Lena Ali', grade: 'DC' },
    { id: 3, courseCode: 'SE/105', studentId: '21787700', name: 'Ahmed Mohamed', grade: 'CC' }
  ];

 
  get filteredStudents() {
    if (!this.searchText.trim()) return this.students;
    
    const searchTerm = this.searchText.toLowerCase();
    return this.students.filter(student => 
      student.name.toLowerCase().includes(searchTerm) || 
      student.studentId.includes(this.searchText) // البحث في ID كمطابقة كاملة
    );
  }

  get rowCount(): number {
    return this.filteredStudents.length;
  }
}