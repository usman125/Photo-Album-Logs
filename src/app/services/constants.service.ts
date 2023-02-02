import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstantsService {
  constructor() { }

  public getBaseUrl(): string {
    return 'https://jsonplaceholder.typicode.com';
  }

}
