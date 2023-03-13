Example

Install package

```shell
npm i eris-logger
```

Create new instance for logger.
```js
const logger = new MyLogger({ file: { dir: 'logs.log' }, terminal: true });
```

Info
```js
logger.info({ title: 'INFO', message: 'info string', params: { foo: 'bar' } });
```

Alert
```js
logger.alert({ title: 'ALERT', message: 'alert string', params: { foo: 'bar' } });
```

Debug
```js
logger.debug({ title: 'DEBUG', message: 'debug string', params: { foo: 'bar' } });
```

Warning
```js
logger.warning({ title: 'WARNING', message: 'warning string', error: new Error('Some warning') });
```

Error
```js
logger.error({ title: 'ERROR', message: 'error string', error: new Error('Some error') });
```

Critical
```js
logger.critical({ title: 'CRITICAl', message: 'critical error string', error: new Error('Some critical error') });
```
