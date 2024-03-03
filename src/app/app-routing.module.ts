import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((x) => x.HomeComponent)
  },
  {
    path: 'edit',
    loadComponent: () => import('./pages/hero-form/hero-form.component').then((x) => x.HeroFormComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/hero-form/hero-form.component').then((x) => x.HeroFormComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
