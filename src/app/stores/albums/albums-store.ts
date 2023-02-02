
import { Injectable } from '@angular/core';
import { Album } from '../../models/album';
import { Store } from '../store';
import { AlbumsState } from './albums-state';

@Injectable()
export class AlbumsStore extends Store<AlbumsState> {

  constructor() {
    super(new AlbumsState());
  }

  addAllAlbums(albums: Array<Album>): void {
    this.setState({
      albums: albums
    })
  }

  addNewAlbum(album: Album): void {
    this.setState({
      albums: [...this.state.albums, album]
    })
  }

  removeAlbum(album: Album): void {
    this.setState({
      albums: this.state.albums.map((element: Album) => {
        if (album.id === element.id) {
          return {
            ...element,
            is_deleted: true,
          };
        }
        return element;
      })
    })
  }

}
