# paul-bunyan

A bunyan initializer so we dont have to keep repeating the code!

## Usage

```javascript
  var paulBunyan = require('paul-bunyan')
  var logger = paulBunyan.init()

  logger.log({}, 'some log message!')
```
