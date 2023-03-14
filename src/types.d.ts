export type TTerminalColors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
export type TTerminalBgColors = 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite';

export type TTerminalBgBrightColors =
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright';

export type TTerminalBrightColors =
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright';

export type TColor = TTerminalColors | TTerminalBrightColors | TTerminalBgColors | TTerminalBgBrightColors;

export type TLogLevel = 'info' | 'alert' | 'debug' | 'warning' | 'error' | 'critical';

export interface ITerminalLoggerConfig {
  use: boolean;
  options: {
    colors?: {
      info?: TColor;
      alert?: TColor;
      debug?: TColor;
      warning?: TColor;
      error?: TColor;
      critical?: TColor;
    };
    levels?: TLogLevel[];
  };
}

export interface IFileLoggerConfig {
  use: boolean;
  options: {
    dir: string;
    colorize?: boolean;
    levels?: TLogLevel[];
  };
}

export interface IGraylogLoggerConfig {
  use: boolean;
  options: {
    hostName: string;
    servers: [{ host: string; port: number }];
    addressName: string;
    levels?: TLogLevel[];
  };
}

export interface IGlobalLoggerConfig {
  dateformat?: false | Intl.DateTimeFormatOptions;
  levels?: TLogLevel[];
}

export interface ILoggerConfig {
  terminal?: ITerminalLoggerConfig;
  file?: IFileLoggerConfig;
  graylog?: IGraylogLoggerConfig;
  options?: IGlobalLoggerConfig;
}

export interface ILoggerProps {
  title: string;
  message: string;
  params?: any;
  error?: any;
  timestamp?: number;
}
