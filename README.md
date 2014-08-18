# paul-bunyan
![deps](http://img.shields.io/david/dev/apriendeau/paul-bunyan.svg?style=flat-square)


![paul bunyan](https://github.com/apriendeau/paul-bunyan/raw/master/img/1386914471_17mkqox_iwfc2q0.gif)

A bunyan initializer so we can crank it like a chainsaw!

## Why?
I was using the same config with some minor changes on a lot of repos
so wanted to host the code in one place rather than keep copying the
initializer.

## Usage

Add it to your package.json, like so:
`npm install --save paul-bunyan`

then use this it like this:

```javascript
  var logger = require('paul-bunyan').init()

  logger.log({}, 'some log message!')
```
