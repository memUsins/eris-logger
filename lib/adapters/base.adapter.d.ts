import { Log } from '../interfaces/log.interface';
export interface BaseAdapter {
    Log(log: Log): void;
    Format(log: Log): any;
}
