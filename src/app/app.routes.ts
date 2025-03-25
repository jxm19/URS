import { Routes } from '@angular/router';
import { StudentnavbarComponent } from './layout/studentnavbar/studentnavbar.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { InstructorhomeComponent } from './pages/instructorhome/instructorhome.component';
import { FchomeComponent } from './pages/fchome/fchome.component';
import { LoginComponent } from './pages/login/login.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { GradesComponent } from './pages/grades/grades.component';
import { GradesFormComponent } from './pages/grades-form/grades-form.component';
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
];
