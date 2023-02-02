
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '../store';
import { UserState } from './user-state';

@Injectable()
export class UserStore extends Store<UserState> {
  constructor() {
    super(new UserState());
  }

  addSelectedUser(user: User): void {
    this.setState({
      user: user
    })
  }
}
