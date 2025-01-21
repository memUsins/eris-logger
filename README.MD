# ErisLogger 

**eris-logger** is a powerful and flexible logging library for NodeJS that allows you to customize the logging process to suit your needs.
It supports logging to files, the console, and provides convenient customization tools.

## Key Features

### Flexible Logging Configuration
- **Supports logging to:**
  - File
  - Console
  - Easy integration of custom adapters for log collection and processing.

### Console Log Color Customization
- Ability to set custom colors for each log level.
- Ability to set custom colors for message text and timestamps.

### Multiple Log Levels Supported
- Debug
- Info
- Alert
- Warn
- Error
- Fatal

### Additional Methods for Logging
- **WithFields**, **WithError**, **WithName** for detailed context:
  ```js
  logger.WithFields({foo: "bar"}).Info("with fields") // output: 2024-12-13T17:21:57.176Z INFO with fields foo=bar
  logger.WithError(new Error("my error")).Info("with error")  // output: 2024-12-13T17:21:57.176Z INFO with error err=my error
  logger.WithName("TestLogger").Info("with name") // output: 2024-12-13T17:21:57.176Z INFO [TestLogger]: with name
  ```

##  Installation

Install the library using the following command:
```shell
npm i eris-logger
```

## Initialization

To get started, create a new logger and configure its adapters:
```js
const logger = new ErisLogger([new ConsoleAdapter(), new FileAdapter()])
```

### Usage Example

```js
logger.Info("Starting application")
logger.WithName("DATABASE").Info("Initialization complete")
logger.WithError(new Error("connection lost")).Error("Failed to connect to database")
```

## Creating a Custom Adapter

**eris-logger** provides an interface for creating custom adapters to handle logs in a specific way:
```typescript
export interface BaseAdapter {
  Log(log: Log): void;

  Format(log: Log): any;
}
```

To create a custom adapter, implement this interface. For example:
```typescript
class MyAdapter {
  Log(log: Log) {
    console.log(this.Format(log));
  }

  Format(log: Log): string {
    return [log.level, log.message].join(' ');
  }
}
```

Then, add the adapter to the logger:
```typescript
const logger = new ErisLogger([new MyAdapter()]);
```
