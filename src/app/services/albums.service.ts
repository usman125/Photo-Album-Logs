import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  constructor(private _httpClient: HttpClient) { }

  getAllUserAlbums(userId: number) {
    return this._httpClient.get(`${AppConfig.apiUrl}/users/${userId}/albums`);
  }

  getAlbumDetails(albumId: number) {
    return this._httpClient.get(`${AppConfig.apiUrl}/albums/${albumId}`);
  }

  getAlbumPhotos(albumId: number) {
    return this._httpClient.get(`${AppConfig.apiUrl}/albums/${albumId}/photos`);
  }


}
