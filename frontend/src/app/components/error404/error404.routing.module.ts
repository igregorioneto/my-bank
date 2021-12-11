import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Error404Component } from "./error404.component";

const error404Routes: Routes = [
    { path: '', component: Error404Component }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(error404Routes)],
  exports: [RouterModule]
})
export class Error404RoutingModule { }
