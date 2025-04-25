import { Component } from '@angular/core';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-grades',
  imports: [InstructornavbarComponent, NgFor, NgClass],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {
  students = [
    { id: 1, code: 'CS/101', name: 'Ahmed Mohamed', grade: 78, gradeLetter: 'CC', status: 'Passed' },
    { id: 2, code: 'IT/202', name: 'Fatima Ali', grade: 92, gradeLetter: 'AA', status: 'Passed' },
    { id: 3, code: 'EE/303', name: 'Omar Khaled', grade: 65, gradeLetter: 'DD', status: 'Failed' },
    { id: 4, code: 'ME/404', name: 'Layla Hassan', grade: 88, gradeLetter: 'BA', status: 'Passed' },
    { id: 5, code: 'CE/505', name: 'Youssef Samir', grade: 70, gradeLetter: 'CB', status: 'Passed' },
    { id: 6, code: 'PH/606', name: 'Mariam Adel', grade: 95, gradeLetter: 'AA', status: 'Passed' },
    { id: 7, code: 'CH/707', name: 'Khalid Ibrahim', grade: 60, gradeLetter: 'DC', status: 'Failed' },
    { id: 8, code: 'MA/808', name: 'Nour Ahmed', grade: 82, gradeLetter: 'BB', status: 'Passed' },
    { id: 9, code: 'BI/909', name: 'Ali Mahmoud', grade: 73, gradeLetter: 'BC', status: 'Passed' }
  ];

  currentPage = 1;
  rowsPerPage = 6;

  get totalPages(): number {
    return Math.ceil(this.students.length / this.rowsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(direction: string) {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  get paginatedStudents() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return this.students.slice(startIndex, startIndex + this.rowsPerPage);
  }
}