import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Log } from 'src/app/models/log';
import { LogsStore } from 'src/app/stores/logs/logs-store';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.scss']
})
export class UserLogsComponent implements OnInit {

  public Subscritpion: Subscription = new Subscription();
  public allLogs: Array<Log> = [] as Array<Log>;

  constructor(private _logsStore: LogsStore) { }

  ngOnInit(): void {
    this.Subscritpion.add(
      this._logsStore.state$.subscribe((data: any) => {
        this.allLogs = data.logs;
        console.log("ALL LOGS IN LOG PAGE:--", this.allLogs);
      })
    )
  }

}
