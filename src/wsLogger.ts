import * as WebSocket from 'ws';

import { LoggerProps, LogLevel } from './types';
import { TerminalLogger } from './terminalLogger';

export interface WSLoggerConfig {
  use: boolean;
  options: {
    hostname: string;
    port?: number;
    protocol?: string;
    auth: {
      projectId: string;
      secret: string;
    };
    levels?: LogLevel[];
  };
}

interface Log {
  chain_id?: string;
  level: LogLevel;
  content: string;
  timestamp?: number;
}

export class WSLogger {
  private use = false;

  private logger = new TerminalLogger({ use: true, options: {} });

  private ws: WebSocket | undefined;
  private wsOpen = false;

  private buffer: object[] = [];

  private hostname = 'localhost';
  private port = 5000;
  private protocol = 'ws';
  private projectId = '';
  private secret = '';
  private levels: LogLevel[] = ['info', 'alert', 'debug', 'warning', 'error', 'fatal'];

  constructor(config: WSLoggerConfig) {
    this.use = config?.use;

    if (config?.options?.hostname) this.hostname = config?.options?.hostname;
    if (config?.options?.port) this.port = config?.options?.port;
    if (config?.options?.protocol) this.protocol = config?.options?.protocol;
    if (config?.options?.auth.projectId) this.projectId = config?.options?.auth.projectId;
    if (config?.options?.auth.secret) this.secret = config?.options?.auth.secret;
    if (config?.options?.levels) this.levels = config?.options?.levels;

    if (this.use) {
      if (!this.projectId) return;
      if (!this.secret) return;

      this.connect();
    }
  }

  private connect() {
    this.ws = new WebSocket(`${this.protocol}://${this.hostname}:${this.port}/ws?project_id=${this.projectId}`);

    this.ws.on('error', (error) => {
      this.logger.print('error', { title: 'Socket encountered error: ', message: error.message });
      this.ws?.close();
    });

    this.ws.on('close', (_, reason) => {
      this.logger.print('warning', { title: 'Socket is closed', message: `Socket is closed. Reconnect will be attempted in 1 second. ${reason.toString()}` });
      setTimeout(() => {
        this.connect();
      }, 1000);
    });

    this.ws.on('open', () => {
      this.wsOpen = true;

      this.logger.print('info', { title: 'ws connected', message: 'socket is connected' });

      this.ws?.send(
        JSON.stringify({
          type: 'sign_in',
          data: {
            project_id: this.projectId,
            secret: this.secret,
          },
        })
      );

      this.ws?.on('message', (data) => {
        let message = '';
        if (Buffer.isBuffer(data)) message = data.toString();

        const parseMessage = JSON.parse(message) as { type: string; data: string | object };

        if (parseMessage.type === 'authorized') {
          this.logger.print('info', { title: 'ws authorized', message: 'socket is authorized' });
        } else if (parseMessage.type === 'unverified') {
          this.logger.print('error', { title: 'ws auth error', message: JSON.stringify(parseMessage.data) });
        }
      });
    });
  }

  private send(message: object): boolean {
    if (!this.wsOpen || !this.ws) return false;

    if (this.buffer.length) {
      for (const m of this.buffer) {
        const messageObject = JSON.stringify({
          type: 'log_create',
          data: m,
        });

        this.ws.send(messageObject, (error) => {
          if (error) this.logger.print('error', { title: 'ws auth error', message: error.message });
        });
      }
    }

    const messageObject = JSON.stringify({
      type: 'log_create',
      data: message,
    });

    this.ws.send(messageObject, (error) => {
      if (error) this.logger.print('error', { title: 'ws auth error', message: error.message });
    });

    return true;
  }

  private newSendObject(logLevel: LogLevel, props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): Log {
    return {
      level: logLevel,
      content: `${props.title}: ${props.message}`,
      timestamp: props.timestamp,
    };
  }

  print(logLevel: LogLevel, props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>) {
    if (!logLevel) return;
    if (!this.use) return;
    if (!this.wsOpen || !this.ws) {
      this.buffer.push(this.newSendObject(logLevel, props));
      return false;
    }
    if (!this.levels.includes(logLevel)) return;

    switch (logLevel) {
      case 'info':
        this.send(this.newSendObject('info', props));
        break;
      case 'alert':
        this.send(this.newSendObject('alert', props));
        break;
      case 'debug':
        this.send(this.newSendObject('debug', props));
        break;
      case 'warning':
        this.send(this.newSendObject('warning', props));
        break;
      case 'error':
        this.send(this.newSendObject('error', props));
        break;
      case 'fatal':
        this.send(this.newSendObject('fatal', props));
        break;
    }
  }
}
