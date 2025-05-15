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
import { ExamdetailsScourseannComponent } from './pages/examdetails-scourseann/examdetails-scourseann.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    {
        path: 'studentnavbar',
        component: StudentnavbarComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'studenthome',
        component: StudenthomeComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'instructorhome',
        component: InstructorhomeComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'fchome',
        component: FchomeComponent,
        canActivate: [AuthGuard]
    },
    
    {
        path: 'resitexams',
        component: ResitexamsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'gradesdetails',
        component: GradesdetailsComponent,
        canActivate: [AuthGuard]
    },
    
    {
        path: 'uploadfiles',
        component: UploadfilesComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'delete-successful',
        component: DeleteSuccessfulComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },

    {
        path: 'upload-error',
        component: UploadErrorComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'examdetails',
        component: ExamdetailsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'examschedule',
        component: ExamscheduleComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'add-files',
        component: AddFilesComponent,
        canActivate: [AuthGuard]
    },


    {
        path: 'instructorhome',
        component: InstructorhomeComponent,
        canActivate: [AuthGuard]
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
        path: 'sections',
        component: SectionsComponent
    },

    {
        path: 'Grades',
        component: GradesComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'Grades-Form',
        component:GradesFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'resit-list',
        component:ResitListComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'upload',
        component:UploadComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'file-added',
        component:FileAddedComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'exam-details',
        component:ExamDetailsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'upload-note',
        component:UploadNoteComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'announcements',
        component:AnnouncementsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'courseann',
        component:CourseannComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'examdetails-scourseann/:course_id',
        component:ExamdetailsScourseannComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'exam-schedule',
        component:ExamscheduleComponent,
        canActivate: [AuthGuard]
    },

    { path: 'grades', component: GradesComponent,
      canActivate: [AuthGuard]
    },

    { path: 'upload-note', component: UploadNoteComponent,
     canActivate: [AuthGuard]
    } 

];
