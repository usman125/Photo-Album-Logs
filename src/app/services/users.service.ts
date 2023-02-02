import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  getAllUsers() {
    return this._httpClient.get(`${AppConfig.apiUrl}/users`);
  }

  getUserDetails(userId: number) {
    return this._httpClient.get(`${AppConfig.apiUrl}/users/${userId}`);
  }

}
