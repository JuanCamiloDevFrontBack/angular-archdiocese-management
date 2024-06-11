import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { existsParishGuard } from './core/guards/exists-parish.guard';

const routes: Routes = [
  {
    path: 'parished',
    loadComponent: () => import('./features/admin-parished/admin-parished.component')
      .then(mod => mod.AdminParishedComponent)
  },
  {
    path: 'priests',
    loadComponent: () => import('./features/admin-priests/admin-priests.component')
      .then(mod => mod.AdminPriestsComponent),
    // canActivate: [existsParishGuard]
  },
  { path: '', redirectTo: 'parished', pathMatch: 'full' },
  { path: '**', redirectTo: 'parished' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
