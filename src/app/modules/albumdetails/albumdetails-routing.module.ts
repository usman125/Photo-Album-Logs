import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumdetailsComponent } from '../../components/component-index';

const routes: Routes = [{ path: '', component: AlbumdetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumdetailsRoutingModule { }
