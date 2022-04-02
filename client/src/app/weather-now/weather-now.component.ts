import { Component, OnDestroy, OnInit } from '@angular/core';
import { WttrObject } from '../../../../common/weather';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.css']
})
export class WeatherNowComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService){

  }
  title = 'header';
  public valeur: string = '';
  public  weatherData:WttrObject[] = [];
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
