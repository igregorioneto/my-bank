import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guard/guard.guard';

const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => 
      import('./components/error404/error404.module').then(
        (m) => m.Error404Module
      ),
    component: Error404Component
  },
  {
    path: 'login',
    loadChildren: () => 
      import('./components/login/login.module').then(
        (m) => m.LoginModule
      )
  },
  {
    path: 'cadastrar',
    loadChildren: () => 
      import('./components/cadastro/cadastro.module').then(
        (m) => m.CadastroModule
      )
  },
  {
    path: 'home',
    loadChildren: () => 
      import('./components/home/home.module').then(
        (m) => m.HomeModule
      ),
    canActivate: [ GuardGuard ],
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => 
      import('./components/home-admin/home-admin.module').then(
        (m) => m.HomeAdminModule
      ),
    canActivate: [ GuardGuard ],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
