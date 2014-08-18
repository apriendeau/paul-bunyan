# paul-bunyan

![paul bunyan](img/1386914471_17mkqox_iwfc2q0.gif)

A bunyan initializer so we can crank it like a chainsaw!

## Usage

Add it to your package.json, like so:
`npm install --save paul-bunyan`

then use this it like this:

```javascript
  var logger = require('paul-bunyan').init()

  logger.log({}, 'some log message!')
```
