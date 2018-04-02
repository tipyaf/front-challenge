import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {FaqComponent} from './faq/faq/faq.component';
import {AdministrationComponent} from './administration/administration.component';
import {AuthAdminService} from './_shared/_guards/auth-admin.service';


const appRoutes: Routes = [
  {path: '', redirectTo: '/faq', pathMatch: 'full'},
  {path: 'faq', component: FaqComponent},
  {path: 'login', component: LoginComponent},
  {path: 'administration', component: AdministrationComponent, canActivate: [AuthAdminService]},

  // otherwise redirect to home
  {path: '**', redirectTo: '/faq'}
];

export const routing = RouterModule.forRoot(appRoutes);
