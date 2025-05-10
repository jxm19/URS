import { Routes } from '@angular/router';
import { UploadfilesComponent } from './pages/uploadfiles/uploadfiles.component';
import { DeleteSuccessfulComponent } from './pages/delete-successful/delete-successful.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UploadErrorComponent } from './pages/upload-error/upload-error.component';
import { GradesdetailsComponent } from './pages/gradesdetails/gradesdetails.component';
import { ExamdetailsComponent } from './pages/examdetails/examdetails.component';
import { ExamscheduleComponent } from './pages/examschedule/examschedule.component';
import { StudentnavbarComponent } from './layout/studentnavbar/studentnavbar.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { InstructorhomeComponent } from './pages/instructorhome/instructorhome.component';
import { FchomeComponent } from './pages/fchome/fchome.component';
import { AddFilesComponent } from './pages/add-files/add-files.component';
import { ResitexamsComponent } from './pages/resitexams/resitexams.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { CourseannComponent } from './pages/courseann/courseann.component';
import { ExamDetailsComponent } from './pages/exam-details/exam-details.component';
import { FileAddedComponent } from './pages/file-added/file-added.component';
import { GradesFormComponent } from './pages/grades-form/grades-form.component';
import { GradesComponent } from './pages/grades/grades.component';
import { LoginComponent } from './pages/login/login.component';
import { ResitListComponent } from './pages/resit-list/resit-list.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { UploadNoteComponent } from './pages/upload-note/upload-note.component';
import { UploadComponent } from './pages/upload/upload.component';

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
        path: 'resitexams',
        component: ResitexamsComponent
    },

    {
        path: 'gradesdetails',
        component: GradesdetailsComponent
    },
    
    {
        path: 'uploadfiles',
        component: UploadfilesComponent
    },

    {
        path: 'delete-successful',
        component: DeleteSuccessfulComponent
    },

    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },

    {
        path: 'upload-error',
        component: UploadErrorComponent
    },

    {
        path: 'examdetails',
        component: ExamdetailsComponent
    },

    {
        path: 'examschedule',
        component: ExamscheduleComponent
    },

    {
        path: 'add-files',
        component: AddFilesComponent
    },


    {
        path: 'instructorhome',
        component: InstructorhomeComponent
    },

    {
        path: 'login/:userType',
        component: LoginComponent
    },

    {
        path: '',
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
        path: 'upload/:courseId',
        component:UploadComponent
    },

    {
        path: 'file-added',
        component:FileAddedComponent
    },

    {
        path: 'exam-details/:courseId',
        component: ExamDetailsComponent
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
