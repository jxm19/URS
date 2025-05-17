import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-added',
  imports: [CommonModule, FormsModule, InstructornavbarComponent],
  templateUrl: './file-added.component.html',
  styleUrl: './file-added.component.css'
})
export class FileAddedComponent implements OnInit {

  instructorName: string = '';
  uploadedFiles: string[] = [];
  excelData: any[] = [];
  showExcelContent = false;
  currentFileName = '';

  showSuccessPopupp = false;

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    this.uploadedFiles = navigation?.extras?.state?.['uploadedFiles'] || [];
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      this.instructorName = 'Unknown Instructor';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:8000/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (res) => {
          this.instructorName = res?.data?.name || 'Unknown Instructor';
        },
        error: (err) => {
          console.error('Error fetching instructor profile:', err);
          this.instructorName = 'Unknown Instructor';
        }
      });
  }

  viewFile(fileName: string) {
    this.currentFileName = fileName;

    const fileUrl = `http://localhost:8001/uploads/${fileName}`;

    fetch(fileUrl)
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.excelData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        this.showExcelContent = true;
      })
      .catch(err => {
        console.error('Error loading Excel file:', err);
        alert('Failed to load Excel file.');
      });
  }

  closeExcelContent() {
    this.showExcelContent = false;
    this.excelData = [];
    this.currentFileName = '';
  }

  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  Upload() {
    this.showSuccessPopupp = true;
    document.body.classList.add('modal-open');
  }

  closeSuccessPopupp() {
    this.showSuccessPopupp = false;
    document.body.classList.remove('modal-open');
  }
}
