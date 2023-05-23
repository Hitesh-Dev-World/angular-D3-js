import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiService {

  constructor() { }

  /**
   * 
   * @param value Has data to compare the values
   * @returns 
   */
  public getColor(value: number): string {
      return (value > 30) ? '#69b3a2' : '#ea2161';
  }
 }
