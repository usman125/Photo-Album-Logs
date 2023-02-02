import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogsComponent } from '../../components/component-index';

const routes: Routes = [{ path: '', component: UserLogsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLogsRoutingModule { }
