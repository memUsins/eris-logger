import { Log, LogField } from './interfaces/log.interface';
import { BaseAdapter } from './adapters/base.adapter';
import { Entry } from './entry';
export declare class ErisLogger {
    private adapters;
    constructor(adapters?: BaseAdapter[]);
    log(log: Log): void;
    debug(...message: string[]): void;
    info(...message: string[]): void;
    alert(...message: string[]): void;
    warn(...message: string[]): void;
    error(...message: string[]): void;
    fatal(...message: string[]): void;
    withFields(fields: LogField): Entry;
    withName(name: string): Entry;
    withError(error: Error): Entry;
}
