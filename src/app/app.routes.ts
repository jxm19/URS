import { Routes } from '@angular/router';
import { StudentnavbarComponent } from './layout/studentnavbar/studentnavbar.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { InstructorhomeComponent } from './pages/instructorhome/instructorhome.component';
import { FchomeComponent } from './pages/fchome/fchome.component';
import { LoginComponent } from './pages/login/login.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { GradesComponent } from './pages/grades/grades.component';
import { GradesFormComponent } from './pages/grades-form/grades-form.component';
import { ResitListComponent } from './pages/resit-list/resit-list.component';
import { UploadComponent } from './pages/upload/upload.component';
import { FileAddedComponent } from './pages/file-added/file-added.component';
import { ExamDetailsComponent } from './pages/exam-details/exam-details.component';
import { UploadNoteComponent } from './pages/upload-note/upload-note.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { CourseannComponent } from './pages/courseann/courseann.component';
import { ExamscheduleComponent } from './pages/exam-schedule/exam-schedule.component';
export const routes: Routes = [
    {
        path: 'studentnavbar',
        component: StudentnavbarComponent
    },

    {
        path: 'studenthome',
        component: StudenthomeComponent
    },

    {
        path: 'instructorhome',
        component: InstructorhomeComponent
    },

    {
        path: 'fchome',
        component: FchomeComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'sections',
        component: SectionsComponent
    },


    {
        path: 'Grades',
        component: GradesComponent
    },

    {
        path: 'Grades-Form',
        component:GradesFormComponent
    },
    {
        path: 'resit-list',
        component:ResitListComponent
    },

    {
        path: 'upload',
        component:UploadComponent
    },

    {
        path: 'file-added',
        component:FileAddedComponent
    },

    {
        path: 'exam-details',
        component:ExamDetailsComponent
    },

    {
        path: 'upload-note',
        component:UploadNoteComponent
    },

    {
        path: 'announcements',
        component:AnnouncementsComponent
    },

    {
        path: 'courseann',
        component:CourseannComponent
    },

    {
        path: 'exam-schedule',
        component:ExamscheduleComponent
    },

  

    
    { path: 'grades', component: GradesComponent },

    { path: 'upload-note', component: UploadNoteComponent } 



    
     
];
