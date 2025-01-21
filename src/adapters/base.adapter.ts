import { Log } from '../interfaces';

export interface BaseAdapter {
  Log(log: Log): void;

  Format(log: Log): any;
}
