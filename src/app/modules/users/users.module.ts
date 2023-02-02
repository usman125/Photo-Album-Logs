import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../../components/component-index';
import { UsersRoutingModule } from './users-routing.module';
import { UserdetailsModule } from '../userdetails/userdetails.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UserdetailsModule
  ]
})
export class UsersModule { }
