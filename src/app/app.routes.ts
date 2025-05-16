import { Routes } from '@angular/router';
import { UploadfilesComponent } from './pages/uploadfiles/uploadfiles.component';
import { DeleteSuccessfulComponent } from './pages/delete-successful/delete-successful.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UploadErrorComponent } from './pages/upload-error/upload-error.component';
import { GradesdetailsComponent } from './pages/gradesdetails/gradesdetails.component';
import { ExamdetailsComponent } from './pages/examdetails/examdetails.component';
import { ExamscheduleComponent } from './pages/examschedule/examschedule.component';
import { InstructorExamScheduleComponent } from './pages/instructor-exam-schedule/instructor-exam-schedule.component';

import { StudentnavbarComponent } from './layout/studentnavbar/studentnavbar.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { InstructorhomeComponent } from './pages/instructorhome/instructorhome.component';
import { FchomeComponent } from './pages/fchome/fchome.component';
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
import { UploadSecComponent } from './pages/upload-sec/upload-sec.component';
import { SecFileAddedComponent } from './pages/sec-file-added/sec-file-added.component';


import { ExamdetailsScourseannComponent } from './pages/examdetails-scourseann/examdetails-scourseann.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    {
        path: 'studentnavbar',
        component: StudentnavbarComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'sec-file-added',
        component: SecFileAddedComponent
      },
      


    {
        path: 'upload-sec',
        component: UploadSecComponent
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
        path: 'upload/:courseId',
        component:UploadComponent

        
    },

    {
        path: 'file-added',
        component:FileAddedComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'exam-details/:courseId',
        component: ExamDetailsComponent
      },

    {
        path: 'upload-note/:courseId',
        component:UploadNoteComponent

    },

    {
        path: 'announcements',
        component:AnnouncementsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'courseann/:id',
        component:CourseannComponent
    },

    {
        path: 'instructor-exam-schedule',
        component:InstructorExamScheduleComponent

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
