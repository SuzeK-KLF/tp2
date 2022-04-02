import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-options',
  templateUrl: './router-options.component.html',
  styleUrls: ['./router-options.component.css']
})
export class RouterOptionsComponent implements OnInit {

  constructor(private platform:PlatformLocation) { }

  public routerPath:string ='';
  public isFlag:boolean = true;

  ngOnInit(): void {
    this.routerPath = this.platform.pathname.substring(1);
    this.routerPath === "weather"? this.isFlag = true : this.isFlag = false;
  }

}
