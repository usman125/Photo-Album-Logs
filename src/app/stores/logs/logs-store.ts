
import { Injectable } from '@angular/core';
import { Log } from 'src/app/models/log';
import { Store } from '../store';
import { LogsState } from './logs-state';

@Injectable()
export class LogsStore extends Store<LogsState> {
  constructor() {
    super(new LogsState());
  }

  addNewLog(log: Log): void {
    this.setState({
      logs: [...this.state.logs, log]
    })
  }

}
