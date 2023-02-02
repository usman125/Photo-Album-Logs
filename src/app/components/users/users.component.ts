import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  allUsers: User[] = [];

  constructor(
    private _usersService: UsersService,
    private _router: Router,
  ) { }


  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this._usersService.getAllUsers().subscribe({
      next: (result: any) => {
        // console.log("All Users:--", result);
        this.allUsers = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  goToAlbum(userId: number): void {
    this._router.navigate(['albums', userId]);
  }

}
