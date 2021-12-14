import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  activeTab = 'search';

  constructor() { }

  ngOnInit(): void {
    
  }

  search(activeTab: any){
    this.activeTab = activeTab;
  }

  report(activeTab: any){
    this.activeTab = activeTab;
  }

}
