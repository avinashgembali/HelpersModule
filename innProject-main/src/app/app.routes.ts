import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AddHelperComponent } from './components/add-helper/add-helper.component';
import { RedirectToFirstIdComponent } from './redirect-to-first-id/redirect-to-first-id.component';

export const routes: Routes = [
  { path: '', component: RedirectToFirstIdComponent},
  { path: 'helpers/add', component: AddHelperComponent },
  { path: 'helpers/edit/:id', component: AddHelperComponent },
  { path: 'helpers/:id', component: MainContentComponent },
];