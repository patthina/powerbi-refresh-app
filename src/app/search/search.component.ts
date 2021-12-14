import { Component, OnInit } from '@angular/core';
//import { stringify } from 'querystring';
import { Root } from '../models/root.model';
import { PowerBIService } from '../services/power-bi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { NotificationService } from '../services/notification.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  root: Root[] = [] 
  flattenedGroup: any = [] 
  search = ''
  //success = false

  constructor(private powerBIService: PowerBIService, 
              private SpinnerService: NgxSpinnerService, 
              private confirmDialogService: ConfirmDialogService,
              private notifyService: NotificationService){

  }

  async ngOnInit(){     
    await this.getFlattenedData()
    
  }

  refreshDataset(groupid: string,datasetid: string){
    
  this.SpinnerService.show();     
   this.powerBIService.refreshDataset(groupid,datasetid).subscribe((data: any) => {
     //this.success = true;
     this.SpinnerService.hide();
     this.notifyService.showSuccess("Refresh invoked successfully!", "Message")
     //this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
   //  console.log(data)
   }) 
   
  }

  showDialog(groupid: string, datasetid: string) {  
    console.log("delete involked")
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {  
      //alert("Yes clicked");  
      this.deleteDataset(groupid, datasetid);
    }, () => {  
      //alert("No clicked");  
    })  
  } 

  deleteDataset(groupid: string, datasetid: string){
    this.SpinnerService.show(); 
    console.log(groupid)
    //if(confirm("Are you sure to delete?")) {
    this.flattenedGroup = []
    this.powerBIService.deleteDataset(groupid, datasetid).subscribe((data: any) => {
      this.root = data;
      //this.getFlattenedData()
      this.root.forEach(grp => {
        if(Array.isArray(grp.group.dataSet)){
          grp.group.dataSet.forEach(ds => {
            this.flattenedGroup.push({
              groupId: grp.group.id, 
              groupName: grp.group.name, 
              datasetId:ds.id,
              datasetName: ds.name
            })
          });
        }
      })       
    })
    //}
    this.SpinnerService.hide();
    this.notifyService.showSuccess("Deleted successfully!", "Message")
  } 

  async getFlattenedData(){
    this.SpinnerService.show(); 
    await this.powerBIService.getRoot().subscribe((data: any)=>{
      this.root = data;  
      console.log(data)  
      this.root.forEach(data => {
        if(Array.isArray(data.group.dataSet)){
          data.group.dataSet.forEach(dataset => {
            this.flattenedGroup.push({
              groupId: data.group.id, 
              groupName: data.group.name, 
              datasetId:dataset.id,
              datasetName: dataset.name
            })
          });
        }
        this.SpinnerService.hide()
      })       
    });        
  }

  async searchData(){    
    this.flattenedGroup = []
    await this.powerBIService.getRoot().subscribe((data: any)=>{
      this.root = data;  
      console.log(data)  
      this.root.forEach(data => {
        if(Array.isArray(data.group.dataSet)){
          data.group.dataSet.forEach(dataset => {
            if(this.search.length > 0) {              
              if(data.group.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || 
                  dataset.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ) {                  
                  this.flattenedGroup.push({
                    groupId: data.group.id, 
                    groupName: data.group.name, 
                    datasetId:dataset.id,
                    datasetName: dataset.name
                  })
              }
            }  
            else{
              this.flattenedGroup.push({
                groupId: data.group.id, 
                groupName: data.group.name, 
                datasetId:dataset.id,
                datasetName: dataset.name
              })
            }       
          });
        }
      })
    })
  }
}
