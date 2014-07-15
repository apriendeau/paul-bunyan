# paul-bunyan

![paul bunyan](http://cdn1.akamai.coub.com/coub/simple/cw_gif_big/242667cc445/51fd06a6956c544e957f1/1386914471_17mkqox_iwfc2q0.gif)

A bunyan initializer so we dont have to keep repeating the code!

## Usage

Add it to your package.json, like so:
```json
{
  "dependencies": {
    "paul-bunyan": "itriage/paul-bunyan"
  }
}
```

then use this it like this:

```javascript
  var logger = require('paul-bunyan').init()

  logger.log({}, 'some log message!')
```
