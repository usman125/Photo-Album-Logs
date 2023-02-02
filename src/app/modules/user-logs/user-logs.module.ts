import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogsComponent } from '../../components/component-index';
import { UserLogsRoutingModule } from './user-logs-routing.module';



@NgModule({
  declarations: [UserLogsComponent],
  imports: [
    CommonModule,
    UserLogsRoutingModule,
  ]
})
export class UserLogsModule { }
