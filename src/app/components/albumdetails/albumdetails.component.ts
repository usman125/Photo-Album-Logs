import { Component, OnDestroy, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { AlbumsService } from '../../services/albums.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Album } from '../../models/album';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { PhotosStore } from '../../stores/photos/photos-store';
import { Log } from '../../models/log';
import { LogsStore } from '../../stores/logs/logs-store';
import { UserStore } from '../../stores/user/user-store';

@Component({
  selector: 'app-albumdetails',
  templateUrl: './albumdetails.component.html',
  styleUrls: ['./albumdetails.component.scss'],
  providers: [AlbumsService, UsersService]
})
export class AlbumdetailsComponent implements OnInit, OnDestroy {

  public albumId: any = null;
  public newPhotoTitle: string = '';
  public albumPhotos: Array<Photo> = [];
  public allLogs: Array<Log> = [];
  public albumDetails = {} as Album;
  public userDetails = {} as User;

  public Subscription: Subscription = new Subscription();

  constructor(
    private _albumService: AlbumsService,
    private _usersService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _photosStore: PhotosStore,
    private _logsStore: LogsStore,
    private _userStore: UserStore,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: any) => {
      this.albumId = params.get('albumId')
      this.getAlbumPhotos();
      this.getAlbumDetails();
    })
    this.Subscription.add(
      this._photosStore.state$.subscribe((data: any) => {
        this.albumPhotos = data.photos;
      })
    );
    this.Subscription.add(
      this._logsStore.state$.subscribe((data: any) => {
        this.allLogs = data.logs;
        console.log(this.allLogs)
      })
    );
  }

  getAlbumDetails(): void {
    this._albumService.getAlbumDetails(this.albumId).subscribe({
      next: (result: any) => {
        this.albumDetails = result;
        this.getUserDetails();
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getAlbumPhotos(): void {
    this._albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (result: any) => {
        this._photosStore.addAllPhotos(
          result.map((element: any) => {
            return {
              ...element,
              is_deleted: false,
              is_new: false
            } as Photo;
          })
        )
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getUserDetails(): void {
    this._usersService.getUserDetails(this.albumDetails?.userId).subscribe({
      next: (result: any) => {
        this.userDetails = result;
        this._userStore.addSelectedUser(this.userDetails);
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  addNewPhoto(): void {
    let photo: Photo = {
      albumId: this.albumDetails.id,
      id: this.albumPhotos.length + 1,
      is_deleted: false,
      is_new: true,
      thumbnailUrl: "https://via.placeholder.com/150/11401d",
      title: this.newPhotoTitle,
      url: "https://via.placeholder.com/600/11401d",
    }
    this._photosStore.addNewPhoto(photo);
    this.newPhotoTitle = '';
    this.addLog('create', photo);
  }

  addLog(type: string, photo: Photo): void {
    if (type === 'create') {
      var log: Log = {
        id: this.allLogs.length + 1,
        albumId: this.albumDetails.id,
        user: {
          id: this.userDetails.id,
          username: this.userDetails.username
        },
        photoId: photo.id,
        actionType: 'create',
        entryType: 'photos'
      }
    } else {
      var log: Log = {
        id: this.allLogs.length + 1,
        albumId: this.albumDetails.id,
        photoId: photo.id,
        user: {
          id: this.userDetails.id,
          username: this.userDetails.username
        },
        actionType: 'delete',
        entryType: 'photos'
      }
    }
    this._logsStore.addNewLog(log);
  }

  deletePhoto(photo: Photo): void {
    this._photosStore.removePhoto(photo);
    this.addLog('delete', photo);
  }

  goToAlbums(): void {
    this._router.navigate(['albums', this.userDetails.id])
  }

  ngOnDestroy(): void {
    this._photosStore.addAllPhotos([]);
    this.Subscription.unsubscribe();
  }

}
