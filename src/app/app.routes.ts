import { Routes } from '@angular/router';
import { StudentnavbarComponent } from './layout/studentnavbar/studentnavbar.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { ResitexamsComponent } from './pages/resitexams/resitexams.component';
import { GradesdetailsComponent } from './pages/gradesdetails/gradesdetails.component';
import { ExamdetailsComponent } from './pages/examdetails/examdetails.component';
import { CourseannComponent } from './pages/courseann/courseann.component';
import { ExamscheduleComponent } from './pages/examschedule/examschedule.component';
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
        path: 'examdetails',
        component: ExamdetailsComponent
    },

    
    {
        path: 'courseann',
        component: CourseannComponent
    },

     
    {
        path: 'examschedule',
        component: ExamscheduleComponent
    },



];
