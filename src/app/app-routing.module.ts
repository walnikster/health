import { NgModule } from "@angular/core";
import { RouterModule, Router, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WeightrackingComponent } from "./components/weightracking/weightracking.component";
import { AuthGuard } from "./guards/auth.guard";
const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  {
    path: "weight",
    component: WeightrackingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule {}
