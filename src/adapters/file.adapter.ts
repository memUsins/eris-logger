import { WriteStream } from 'node:fs';
import * as path from 'node:path';
import * as fs from 'node:fs';

import { Log, LogLevel } from '../interfaces';
import { BaseAdapter } from './base.adapter';

export interface FileAdapterConfig {
  enable?: boolean;
  level: LogLevel;

  destination: string;
}

export class FileAdapter implements BaseAdapter {
  stream?: WriteStream;
  queue: Log[] = [];
  isWriting = false;

  config: FileAdapterConfig = {
    enable: true,
    level: LogLevel.Info,
    destination: 'logs/logs.json',
  };

  constructor(config?: FileAdapterConfig) {
    this.config = { ...this.config, ...config };
    if (!this.config.enable) return;

    this.stream = fs.createWriteStream(this.config?.destination, { flags: 'a' });
    this.ensureDirectoryExists(this.config.destination);

    process.on('exit', this.close.bind(null, { cleanup: true }));
    process.on('SIGINT', this.close.bind(null, { exit: true }));
    process.on('SIGUSR1', this.close.bind(null, { exit: true }));
    process.on('SIGUSR2', this.close.bind(null, { exit: true }));
    process.on('uncaughtException', this.close.bind(null, { exit: true }));
  }

  Log(log: Log) {
    if (!this.config.enable || !log.isEnabled(this.config.level) || !this.stream) return;

    this.queue.push(log);
    this.processQueue();
  }

  Format(log: Log): object {
    const level = log.level.toUpperCase() || 'UNSELECTED';
    const date = new Date().toISOString();
    let message = log.message;

    if (log.data?.name && log.data?.withName) {
      message = `[${log.data?.name}]: ${message}`;
    }

    let error = '';
    if (log.data?.error) error = `err=${log.data?.error.message}`;

    return {
      ts: date,
      level: level,
      msg: message,
      err: error,
      fields: log.data?.fields,
    };
  }

  private async processQueue() {
    if (this.isWriting || this.queue.length === 0) return;

    this.isWriting = true;
    const log = this.queue.shift();
    if (!log) {
      this.isWriting = false;
      return;
    }

    if (!this?.stream?.write(JSON.stringify(this.Format(log)) + '\n')) {
      await new Promise((resolve) => this?.stream?.once('drain', resolve));
    }

    this.isWriting = false;
    this.processQueue();
  }

  private ensureDirectoryExists(filePath: string) {
    const dir = path.dirname(filePath);
    if (dir == '.') return;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private close() {
    this?.stream?.end();
  }
}
