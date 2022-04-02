import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService, private router:Router){

  }
  title = 'header';
  public valeur: string = '';
  public weatherSubject:WttrObject[] = []; 
  public weatherSearchSubject:WttrObject[] = []; 
  private subscription?: Subscription; 
  
  ngOnInit(): void{
    this.subscription = this.weatherService.weatherSubject.subscribe({next: (valeur) => {
      this.weatherSubject = valeur;
    }});
    
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  public submitFunc(): void{
    const locations: string = String(this.valeur);
    this.weatherService.updateWeather(locations).subscribe({
      error: (err) => {
        console.error(err)
      }
    });    
    this.router.navigate(['/weather/now']);
  }
}
