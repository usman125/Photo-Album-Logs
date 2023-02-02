import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumdetailsRoutingModule } from './albumdetails-routing.module';
import { AlbumdetailsComponent } from 'src/app/components/component-index';
import { UserdetailsModule } from '../userdetails/userdetails.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AlbumdetailsComponent],
  imports: [
    CommonModule,
    AlbumdetailsRoutingModule,
    UserdetailsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class AlbumdetailsModule { }
