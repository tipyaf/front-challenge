import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';



// used to create fake backend
import {FakeBackendProvider, JwtInterceptorProvider} from './_helpers/fake-back-end';

import {AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgivenPasswordComponent } from './login/forgiven-password/forgiven-password/forgiven-password.component';
import { FaqComponent } from './home/faq/faq/faq.component';
import { AuthenticationService } from './_shared/services/authentication.service';
import { AuthAdminService } from './_shared/_guards/auth-admin.service';
import { AuthLoggedService } from './_shared/_guards/auth-logged.service';


// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    // primeng
    InputTextModule,
    ButtonModule,
    DialogModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FaqComponent,
    ForgivenPasswordComponent,
  ],
  providers: [
    AuthenticationService,
    AuthAdminService,
    AuthLoggedService,
    // providers used to create fake backend
    JwtInterceptorProvider,
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
