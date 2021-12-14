import { Injectable } from '@angular/core';
import { Group } from '../models/group.model';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class PowerBIService {

  constructor(private http: HttpClient ) { 

  }

  getRoot(){
   return this.http.get("http://localhost:50427/api/powerbi/GetRoot")
  }

  refreshDataset(groupId: string, datasetId: string){
    var headers = {'content-type' : 'application/json'}
    //var body = JSON.stringify({groupId, datasetId})
    //groupId = "ee1033c9-d062-49cb-90af-8e1a71b1feea";
    //datasetId = "7297dfef-e054-4ecf-8359-8fc7ae04a2e6";
    //console.log(groupId, datasetId)
    return this.http.post(`http://localhost:50427/api/powerbi/RefreshDataSet/${groupId}/${datasetId}`,{headers: headers})
  }
  
  deleteDataset(groupId: string, datasetId: string){
    var headers = {'content-type' : 'application/json'}
    //groupId = "10"
    //datasetId = "10-1"
    console.log(groupId)
    return this.http.post(`http://localhost:50427/api/powerbi/DeleteDataSet/${groupId}/${datasetId}`,{headers: headers})
  }

  addDataset(group: any){
    var headers = {'content-type' : 'application/json'}
    console.log(group)
    var body = JSON.stringify(group)
    return this.http.post(`http://localhost:50427/api/powerbi/AddDataSet`,body,{headers: headers})

  }
}
