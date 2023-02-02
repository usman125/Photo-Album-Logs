import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdetailsRoutingModule } from './userdetails-routing.module';
import { UserDetailsComponent } from '../../components/component-index';
import { ActionsMatrixModule } from '../actions-matrix/actions-matrix.module';



@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    UserdetailsRoutingModule,
    ActionsMatrixModule,
  ],
  exports: [UserDetailsComponent]
})
export class UserdetailsModule { }
