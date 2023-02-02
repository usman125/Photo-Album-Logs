import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'albums/:userId',
    loadChildren: () => import('./modules/albums/albums.module').then(m => m.AlbumsModule)
  },
  {
    path: 'albumdetails/:albumId',
    loadChildren: () => import('./modules/albumdetails/albumdetails.module').then(m => m.AlbumdetailsModule)
  },
  {
    path: 'userlogs',
    loadChildren: () => import('./modules/user-logs/user-logs.module').then(m => m.UserLogsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
