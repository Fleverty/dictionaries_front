import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { ClubsComponent } from './clubs/clubs.component';


const routes: Routes = [
  {
    path: "country",
    component: CountriesComponent
  },
  {
    path: "club",
    component: ClubsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
