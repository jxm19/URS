import { Routes } from '@angular/router';
import { FchomeComponent } from './pages/fchome/fchome.component';
import { UploadfilesComponent } from './pages/uploadfiles/uploadfiles.component';
import { DeleteConfirmationComponent } from './pages/delete-confirmation/delete-confirmation.component';
import { DeleteSuccessfulComponent } from './pages/delete-successful/delete-successful.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UploadErrorComponent } from './pages/upload-error/upload-error.component';

export const routes: Routes = [
  
  

   
    {
        path: 'fchome',
        component: FchomeComponent
    },
    
    {
        path: 'uploadfiles',
        component: UploadfilesComponent
    },

    {
        path: 'delete-confirmation',
        component: DeleteConfirmationComponent
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

 
   


   



];
