import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarData } from '../model/data';
import { HttpCallsService } from '../shared/generic-services/http-calls.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient, private httpGen : HttpCallsService) { }

  
  public getData():Observable<BarData[]>{
    return this.httpGen.readApiArray('../../assets/data.json');
  }
}
