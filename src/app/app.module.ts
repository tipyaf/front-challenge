import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './app.routing';


// used to create fake backend
import { InitFakeDbService } from './_helpers/fake-back-end';
import {FakeBackendProvider, InitFakeDbProviderFactory, JwtInterceptorProvider} from './_helpers/fake-back-end';



// services
import { AuthenticationService } from './_shared/services/authentication.service';
import { AuthAdminService } from './_shared/_guards/auth-admin.service';
import { ErrorsHandlerService } from './_shared/services/errors/errors-handler.service';
import { FaqService } from './_shared/services/data/faq.service';
import { UserService } from './_shared/services/data/users.service';

// primeng
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import { ToastrModule } from 'ngx-toastr';


// components
import {AppComponent} from './app.component';
import { AdministrationComponent } from './administration/administration.component';
import { AddComponent } from './administration/add/add.component';
import { AddFormComponent } from './administration/add/add-form/add-form.component';
import { ForgivenPasswordComponent } from './login/forgiven-password/forgiven-password.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './administration/list/list.component';
import { FaqTableComponent } from './administration/list/faq-table/faq-table.component';
import { FaqFilterPipe } from './_shared/filter/faq-filter.pipe';
import { FaqSearchComponent } from './_shared/components/faq-search/faq-search.component';
import { ConnexionsControlsComponent } from './_shared/components/connexions-controls/connexions-controls.component';



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
    AccordionModule,
    ButtonModule,
    ChipsModule,
    DialogModule,
    GrowlModule,
    InputTextModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
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
    FaqTableComponent,
    FaqFilterPipe,
    FaqSearchComponent,
    ConnexionsControlsComponent
  ],
  providers: [
    AuthenticationService,
    AuthAdminService,
    FaqService,
    ErrorsHandlerService,
    UserService,
    JwtInterceptorProvider, // provider used to add in requests header the JWT token
    FakeBackendProvider, // provider used to create fake backend
    InitFakeDbService,
    { provide: APP_INITIALIZER, useFactory: InitFakeDbProviderFactory, deps: [InitFakeDbService], multi: true },  // store fake db in session storage
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
