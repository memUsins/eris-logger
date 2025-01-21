/// <reference types="node" />
import { WriteStream } from 'node:fs';
import { Log, LogLevel } from '../interfaces';
import { BaseAdapter } from './base.adapter';
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
