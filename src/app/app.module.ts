import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';


// used to create fake backend
import {FakeBackendProvider, JwtInterceptorProvider} from './_helpers/fake-back-end';


// services
import { AuthenticationService } from './_shared/services/authentication.service';
import { AuthAdminService } from './_shared/_guards/auth-admin.service';
import { AuthLoggedService } from './_shared/_guards/auth-logged.service';
import { FaqService } from './_shared/services/faq.service';

// primeng
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

import {ToastrModule} from 'ngx-toastr';


// components
import {AppComponent} from './app.component';
import { AdministrationComponent } from './administration/administration.component';
import { AddComponent } from './administration/add/add.component';
import { AddFormComponent } from './administration/add/add-form/add-form.component';
import { ForgivenPasswordComponent } from './login/forgiven-password/forgiven-password/forgiven-password.component';
import { FaqComponent } from './faq/faq/faq.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './administration/list/list.component';
import { TableComponent } from './administration/list/table/table.component';




@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    ToastrModule.forRoot(),
    // primeng
    GrowlModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ChipsModule,
    TableModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdministrationComponent,
    FaqComponent,
    ForgivenPasswordComponent,
    AddComponent,
    AddFormComponent,
    ListComponent,
    TableComponent
  ],
  providers: [
    AuthenticationService,
    AuthAdminService,
    AuthLoggedService,
    FaqService,
    // providers used to create fake backend
    JwtInterceptorProvider,
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
