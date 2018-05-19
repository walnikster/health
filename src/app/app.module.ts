import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { FlashMessagesModule } from "angular2-flash-messages";
import { ChartModule } from 'angular2-chartjs';

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppComponent } from "./app.component";
import { WeightFormComponent } from "./components/weight-form/weight-form.component";
import { WeightHistoryComponent } from "./components/weight-history/weight-history.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { WeightrackingComponent } from "./components/weightracking/weightracking.component";
import { WeightService } from "./services/weight.service";
import { AuthService } from "./services/auth.service";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    WeightFormComponent,
    WeightHistoryComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    WeightrackingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "health"),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [WeightService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
