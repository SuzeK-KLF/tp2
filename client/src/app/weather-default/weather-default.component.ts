import { Component, OnDestroy, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-default',
  templateUrl: './weather-default.component.html',
  styleUrls: ['./weather-default.component.css']
})
export class WeatherDefaultComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService){

  }
  title = 'Home';
  public weatherData:WttrObject[] = [];
  public city:String = '';
  public region:String = '';
  public country:String = '';
  private subscription?: Subscription; 
  
  ngOnInit(): void{
    console.log('%cweather-default.component.ts line:24 ngonInit page', 'color: #007acc;');
    this.subscription = this.weatherService.weatherSubject.subscribe({next: (valeur) => {
      console.log(
        '%cweather-default.component.ts line:25 this.weatherData',
        'color: #007acc;',
        JSON.stringify(this.weatherData[0]?.nearest_area[0], null, "\t" )
      );
      this.weatherData = valeur;
      this.city = valeur[0]?.nearest_area[0].areaName[0].value;
      this.region = valeur[0]?.nearest_area[0].region[0].value;
      this.country = valeur[0]?.nearest_area[0].country[0].value;
    }});
    
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
