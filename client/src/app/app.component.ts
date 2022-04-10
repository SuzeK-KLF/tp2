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

  constructor(){

  }
  title = 'root';
  
  ngOnInit(): void{
    
  }

  ngOnDestroy(): void {
  }

}
