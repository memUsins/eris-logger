/// <reference types="node" />
import { WriteStream } from 'node:fs';
import { BaseAdapter } from './base.adapter';
import { LogLevel } from '../interfaces/log.interface';
import { Log } from '../interfaces/log.interface';
export interface FileAdapterConfig {
    enable?: boolean;
    level: LogLevel;
    destination: string;
}
export declare class FileAdapter implements BaseAdapter {
    stream?: WriteStream;
    queue: Log[];
    isWriting: boolean;
    config: FileAdapterConfig;
    constructor(config?: FileAdapterConfig);
    Log(log: Log): void;
    Format(log: Log): object;
    private processQueue;
    private ensureDirectoryExists;
    private close;
}
