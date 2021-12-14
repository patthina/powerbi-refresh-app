import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { PowerBIService } from '../services/power-bi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  constructor(private powerBIService: PowerBIService, 
              private SpinnerService:NgxSpinnerService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
  }

  addReport(formData:any){
    console.log(formData.value)
    this.SpinnerService.show(); 
    let group = new Group(formData.value.groupId, 
                          formData.value.groupName,   
                          [{id: formData.value.datasetId, name: formData.value.datasetName}])

    this.powerBIService.addDataset(group).subscribe((data: any)=>{
        formData.reset();
        this.SpinnerService.hide();
        this.notifyService.showSuccess("Dataset added successfully!", "Message")
    })    
  } 
}
