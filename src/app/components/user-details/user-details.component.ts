import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input('userDetails') userDetails = {} as User;
  @Input('pageType') pageType: string = '';

  constructor() { }

  ngOnInit(): void {
    // console.log("USER DETAILS PAGE:--", this.userDetails, this.pageType);
  }

}
