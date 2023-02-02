import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsMatrixRoutingModule } from './actions-matrix-routing.module';
import { ActionsMatrixComponent } from '../../components/component-index';



@NgModule({
  declarations: [ActionsMatrixComponent],
  imports: [
    CommonModule,
    ActionsMatrixRoutingModule,
  ],
  exports: [ActionsMatrixComponent]
})
export class ActionsMatrixModule { }
