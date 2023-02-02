import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from '../../models/album';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { LogsStore } from '../../stores/logs/logs-store';
import { Subscription } from 'rxjs';
import { Log } from '../../models/log';
import { UserStore } from '../../stores/user/user-store';
import { AlbumsStore } from 'src/app/stores/albums/albums-store';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  providers: [AlbumsService, UsersService]
})
export class AlbumsComponent implements OnInit, OnDestroy {

  public userId: any = null;
  public newAlbumTitle: string = '';
  public userDetails = {} as User;
  public userAlbums: Array<Album> = [];
  public allLogs: Array<Log> = [];

  public Subscription: Subscription = new Subscription();

  constructor(
    public _albumsService: AlbumsService,
    public _usersService: UsersService,
    public _activatedRoute: ActivatedRoute,
    public _logsStore: LogsStore,
    public _albumsStore: AlbumsStore,
    public _userStore: UserStore,
    public _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
    this.getUserAlbums();
    this.getUserDetails();
    this.Subscription.add(
      this._albumsStore.state$.subscribe((data: any) => {
        this.userAlbums = data.albums;
      })
    );
    this.Subscription.add(
      this._logsStore.state$.subscribe((data: any) => {
        this.allLogs = data.logs;
      })
    );
  }

  getUserAlbums(): void {
    this._albumsService.getAllUserAlbums(this.userId).subscribe({
      next: (result: any) => {
        this._albumsStore.addAllAlbums(
          result.map((element: any) => {
            return {
              ...element,
              is_deleted: false,
              is_new: false,
            } as Album;
          })
        )
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getUserDetails(): void {
    this._usersService.getUserDetails(this.userId).subscribe({
      next: (result: any) => {
        this.userDetails = result;
        this._userStore.addSelectedUser(this.userDetails);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  addNewAlbum(): void {
    let album: Album = {
      id: this.userAlbums.length + 1,
      userId: this.userDetails.id,
      is_new: true,
      is_deleted: false,
      title: this.newAlbumTitle,
    }
    this._albumsStore.addNewAlbum(album);
    this.newAlbumTitle = '';
    this.addLog('create', album);
  }

  addLog(type: string, album: Album): void {
    if (type === 'create') {
      var log: Log = {
        id: this.allLogs.length + 1,
        albumId: album.id,
        user: {
          id:this.userDetails.id,
          username:this.userDetails.username
        },
        photoId: NaN,
        actionType: 'create',
        entryType: 'albums'
      }
    } else {
      var log: Log = {
        id: this.allLogs.length + 1,
        albumId: album.id,
        photoId: NaN,
        user: {
          id:this.userDetails.id,
          username:this.userDetails.username
        },
        actionType: 'delete',
        entryType: 'albums'
      }
    }
    this._logsStore.addNewLog(log);
  }

  deleteAlbum(album: Album): void {
    this._albumsStore.removeAlbum(album);
    this.addLog('delete', album);
  }

  goToAlbum(album: Album): void {
    this._router.navigate(['/albumdetails', album.id]);
  }

  goToHome(): void {
    this._router.navigate(['']);
  }

  ngOnDestroy(): void {
    this._albumsStore.addAllAlbums([]);
    this.Subscription.unsubscribe();
  }

}
