import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { SorterService } from './sorter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [DataService, SorterService]
})
export class CoreModule { }
