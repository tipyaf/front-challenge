import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

// fake data db (mock)
import {UsersDB, FaqDB} from './app/_helpers/fake-back-end/_db/index';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
// init data from fake db (mock) in the session storage (to delete datas after close app)
  .then(() => {
    sessionStorage.setItem('users', JSON.stringify(UsersDB));
    sessionStorage.setItem('faq', JSON.stringify(FaqDB));
  })
  .catch(err => console.log(err));
