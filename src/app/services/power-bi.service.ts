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
   return this.http.get("https://jsonplaceholder.typicode.com/users")
  }

  
}
