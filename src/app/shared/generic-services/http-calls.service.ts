import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {


  /**
   * @author Hitesh 
   * @description Common calling HTTP API calls
   * @param httpClient 
   */

  constructor(private httpClient : HttpClient) { }

/**
 * 
 * @param url Generic way to get url and attach as path 
 * @returns 
 */

  readApiArray(url : string) : Observable<any[]> {
    return this.httpClient.get<any>(url)
  }
}
