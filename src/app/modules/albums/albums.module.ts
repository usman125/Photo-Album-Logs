import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent, UserDetailsComponent } from '../../components/component-index';
import { AlbumsRoutingModule } from './albums-routing.module';
import { UserdetailsModule } from '../userdetails/userdetails.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    UserdetailsModule,
    FormsModule,
  ]
})
export class AlbumsModule { }
