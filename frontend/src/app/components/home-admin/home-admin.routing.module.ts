import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent } from "./home-admin.component";

const homeAdminRoutes: Routes = [
    { path: '', component: HomeAdminComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(homeAdminRoutes)],
  exports: [RouterModule]
})
export class HomeAdminRoutingModule { }
