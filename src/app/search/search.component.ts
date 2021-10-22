import { Component, OnInit } from '@angular/core';
import { Root } from '../models/root.model';
import { PowerBIService } from '../services/power-bi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  reports: Root[] = []

  constructor(private powerBIService: PowerBIService){

  }

  ngOnInit(): void {
    // this.reports = [
    //   {dsName: "Value1", grName: "Value2"},
    //   {dsName: "Value3", grName: "Value4"},
    //   {dsName: "Value5", grName: "Value6"},
    //   {dsName: "Value7", grName: "Value8"},
    // ]
    this.powerBIService.getRoot().subscribe((data)=>{
      console.log(data)
    })
  }

}
