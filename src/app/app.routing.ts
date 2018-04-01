import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FaqComponent} from './home/faq/faq/faq.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, children: [
      {path: 'faq', component: FaqComponent},
    ]},

  // otherwise redirect to home
  {path: '**', redirectTo: '/home'}
];

export const routing = RouterModule.forRoot(appRoutes);
