import { Log, LogLevel } from '../interfaces';
import { BaseAdapter } from './base.adapter';
export type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright';
export type ConsoleAdapterLevelColorConfig = {
    [key in LogLevel]: Color;
};
export interface ConsoleAdapterColorConfig {
    dateColor: Color;
    messageColor: Color;
    levelColors: ConsoleAdapterLevelColorConfig;
}
export interface ConsoleAdapterConfig {
    enable?: boolean;
    level: LogLevel;
    colors?: ConsoleAdapterColorConfig;
}
export declare class ConsoleAdapter implements BaseAdapter {
    config: ConsoleAdapterConfig;
    constructor(config?: ConsoleAdapterConfig);
    Log(log: Log): void;
    Format(log: Log): string;
    private setDefaultColorsConfig;
    private setDefaultLevelsColorConfig;
}
