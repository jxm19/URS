import { Routes } from '@angular/router';
import { StudentnavbarComponent } from './layout/studentnavbar/studentnavbar.component';
import { StudenthomeComponent } from './pages/studenthome/studenthome.component';
import { InstructorhomeComponent } from './pages/instructorhome/instructorhome.component';
import { FchomeComponent } from './pages/fchome/fchome.component';
import { ResitexamsComponent } from './pages/resitexams/resitexams.component';
import { PreviousComponent } from './layout/previous/previous.component';
import { UpcomingComponent } from './layout/upcoming/upcoming.component';
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
        path: 'previous',
        component: PreviousComponent
    },

    {
        path: 'upcoming',
        component: UpcomingComponent
    },



];
