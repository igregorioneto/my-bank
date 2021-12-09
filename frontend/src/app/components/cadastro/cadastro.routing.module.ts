import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./cadastro.component";

const cadastroRoutes: Routes = [
    { path: '', component: CadastroComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(cadastroRoutes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
