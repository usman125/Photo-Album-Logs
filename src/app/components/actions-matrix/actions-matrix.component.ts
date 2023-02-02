import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album';
import { Photo } from 'src/app/models/photo';
import { AlbumsStore } from 'src/app/stores/albums/albums-store';
import { PhotosStore } from 'src/app/stores/photos/photos-store';
import { Log } from '../../models/log';
import { User } from '../../models/user';
import { LogsStore } from '../../stores/logs/logs-store';
import { UserStore } from '../../stores/user/user-store';

@Component({
  selector: 'app-actions-matrix',
  templateUrl: './actions-matrix.component.html',
  styleUrls: ['./actions-matrix.component.scss']
})
export class ActionsMatrixComponent implements OnInit, OnDestroy {

  @Input('pageType') pageType: string = '';
  public Subscription: Subscription = new Subscription();
  public allLogs: Array<Log> = [] as Array<Log>;
  public userDetails: User = {} as User;
  public allPhotos: Array<Photo> = [] as Array<Photo>;
  public allAlbums: Array<Album> = [] as Array<Album>;

  public albumsCreated: number = NaN;
  public albumsDeleted: number = NaN;
  public photosCreated: number = NaN;
  public photosDeleted: number = NaN;

  constructor(
    private _logStore: LogsStore,
    private _photosStore: PhotosStore,
    private _albumsStore: AlbumsStore,
    private _userStore: UserStore,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._photosStore.state$.subscribe(data => {
        this.allPhotos = data.photos.filter((element: Photo) => !element.is_deleted);
        console.log("PHOTOS IN ACTION MATRIX:---", this.allPhotos);
      })
    );
    this.Subscription.add(
      this._albumsStore.state$.subscribe(data => {
        this.allAlbums = data.albums.filter((element: Album) => !element.is_deleted);
        console.log("ALBUMS IN ACTION MATRIX:---", this.allAlbums);
      })
    );
    this.Subscription.add(
      this._userStore.state$.subscribe(data => {
        console.log("SELECTED USER IN ACTION MATRIX:---", data.user);
        this.userDetails = data.user;
        this.setUserActionsCount();
      })
    );
    this.Subscription.add(
      this._logStore.state$.subscribe(data => {
        this.allLogs = data.logs;
        this.setUserActionsCount();
      })
    );
  }

  setUserActionsCount(): void {
    let userAlbumsDeleted: Array<Log> = this.allLogs.filter(
      (element: Log) => (
        (element.user.id === this.userDetails.id) &&
        (element.entryType === 'albums') &&
        (element.actionType === 'delete')
      )
    )
    let userAlbumsCreated: Array<Log> = this.allLogs.filter(
      (element: Log) => (
        (element.user.id === this.userDetails.id) &&
        (element.entryType === 'albums') &&
        (element.actionType === 'create')
      )
    )
    let userPhotosDeleted: Array<Log> = this.allLogs.filter(
      (element: Log) => (
        (element.user.id === this.userDetails.id) &&
        (element.entryType === 'photos') &&
        (element.actionType === 'delete')
      )
    )
    let userPhotosCreated: Array<Log> = this.allLogs.filter(
      (element: Log) => (
        (element.user.id === this.userDetails.id) &&
        (element.entryType === 'photos') &&
        (element.actionType === 'create')
      )
    )
    console.log("ALL LOGS IN ACTION MATRIX:---",
      this.allLogs,
      userAlbumsDeleted,
      userAlbumsCreated,
      userPhotosCreated,
      userPhotosDeleted,
    );
    this.albumsDeleted = userAlbumsDeleted.length;
    this.albumsCreated = userAlbumsCreated.length;
    this.photosCreated = userPhotosCreated.length;
    this.photosDeleted = userPhotosDeleted.length;

  }

  ngOnDestroy(): void {
    this._userStore.addSelectedUser({} as User);
    this.Subscription.unsubscribe();
  }

}
