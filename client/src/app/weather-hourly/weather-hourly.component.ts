import { Component, OnDestroy, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService){

  }
  title = 'header';
  public weatherData:WttrObject[] = [];
  public city:String = '';
  public region:String = '';
  public country:String = '';
  private subscription?: Subscription; 
  
  ngOnInit(): void{
    this.subscription = this.weatherService.weatherSubject.subscribe({next: (valeur) => {
      this.weatherData = valeur;
      
    }});
    
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }


}
