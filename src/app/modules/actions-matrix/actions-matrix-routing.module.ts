import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsMatrixComponent } from '../../components/component-index';

const routes: Routes = [{ path: '', component: ActionsMatrixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsMatrixRoutingModule { }
