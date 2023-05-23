import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


const part = [
  CommonModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
]

@NgModule({
  declarations: [],
  imports: [...part],
  exports: [...part]
})
export class MaterialModule { }
