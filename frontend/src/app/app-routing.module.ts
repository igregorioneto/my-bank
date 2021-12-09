import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guard/guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => 
      import('./components/login/login.module').then(
        (m) => m.LoginModule
      ),
    component: LoginComponent
  },
  {
    path: 'cadastrar',
    loadChildren: () => 
      import('./components/cadastro/cadastro.module').then(
        (m) => m.CadastroModule
      ),
    component: CadastroComponent
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
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
