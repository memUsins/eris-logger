import { LoggerProps, LogLevel } from './types';
export type TerminalColors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
export type TerminalBgColors = 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite';
export type TerminalBgBrightColors = 'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgYellowBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright';
export type TerminalBrightColors = 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';
export type Color = TerminalColors | TerminalBrightColors | TerminalBgColors | TerminalBgBrightColors;
export interface TerminalColorsOptions {
    info?: Color;
    alert?: Color;
    debug?: Color;
    warning?: Color;
    error?: Color;
    fatal?: Color;
}
export interface TerminalLoggerConfig {
    use: boolean;
    options: {
        colors?: TerminalColorsOptions;
        levels?: LogLevel[];
    };
    dateFormat?: false | Intl.DateTimeFormatOptions;
}
export declare class TerminalLogger {
    private use;
    private colors;
    private dateformat;
    private levels;
    constructor(config: TerminalLoggerConfig);
    private formatDate;
    private formatString;
    print(logLevel: LogLevel, props: Pick<LoggerProps, 'title' | 'message' | 'params' | 'timestamp'>): void;
}
