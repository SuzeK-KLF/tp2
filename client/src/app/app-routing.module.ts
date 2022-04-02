import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherHourlyComponent } from './weather-hourly/weather-hourly.component';
import { WeatherDefaultComponent } from './weather-default/weather-default.component';

const routes: Routes = [
  
  //On redirige / vers /weather/now
  {path:'',pathMatch:'full', redirectTo:'/weather'},
  
  //Route pour la page d'authentification
  {path:'auth', component: AuthComponent },

  
  //TODO activer l'authentification sur les routes /weather/now et /weather/hourly
  //L'option "canActivate: [AuthGuard]" permet de bloquer
  //une route si l'utilisateur n'est pas login
  {path:'weather', component: WeatherDefaultComponent},
  {path:'weather/now', component: WeatherNowComponent},
  {path:'weather/hourly', component: WeatherHourlyComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
