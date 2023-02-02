
import { Injectable } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { Store } from '../store';
import { PhotosState } from './photos-state';

@Injectable()
export class PhotosStore extends Store<PhotosState> {
  constructor() {
    super(new PhotosState());
  }


  addAllPhotos(photos: Array<Photo>): void {
    this.setState({
      photos: photos
    })
  }

  addNewPhoto(photo: Photo): void {
    this.setState({
      photos: [...this.state.photos, photo]
    })
  }

  removePhoto(photo: Photo): void {
    this.setState({
      photos: this.state.photos.map((element: Photo) => {
        if (photo.id === element.id) {
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
