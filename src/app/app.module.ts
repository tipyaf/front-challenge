import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// used to create fake backend
import {FakeBackendProvider, JwtInterceptorProvider} from './_helpers/fake-back-end/index';

import {AppComponent} from './app.component';

import {routing} from './app.routing';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './home/faq/faq/faq.component';
import {AuthenticationService} from './_shared/services/authentication.service';
import {AuthAdminService} from './_shared/_guards/auth-admin.service';
import {AuthLoggedService} from './_shared/_guards/auth-logged.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FaqComponent,
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
