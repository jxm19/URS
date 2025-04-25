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
import { ResitexamsComponent } from './pages/resitexams/resitexams.component';
import { AddFilesComponent } from './pages/add-files/add-files.component';

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

];
