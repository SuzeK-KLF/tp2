import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WttrObject } from '../../../common/weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(private weatherService: WeatherService){

  }
  title = 'root';
  public valeur: string = '';
  public weatherSubject:WttrObject[] = [];
  private subscription?: Subscription; 
  
  ngOnInit(): void{
    this.subscription = this.weatherService.weatherSubject.subscribe({next: (valeur) => {
      this.weatherSubject = valeur;
    }});
    
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

}
