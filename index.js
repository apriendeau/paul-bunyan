var path   = require('path')
var bunyan = require('bunyan')
var fs     = require('fs')

function Logger() {}

Logger.prototype.init = function (opts) {
  var loggerName = opts.name

  var loggerOpts = {
    name: loggerName,
    streams: this.getStreams(opts),
    serializers: this.getSerializers(),
  }

  if (process.env.PM2_NAME) {
    loggerOpts.pm2_name = process.env.PM2_NAME
  }

  return bunyan.createLogger(loggerOpts)
}

Logger.prototype.getSerializers = function () {
  var serializers = {
    req: reqSerializer,
    res: resSerializer,
    error: bunyan.stdSerializers.err
  }
  return serializers
  
  function reqSerializer(req) {
    return {
      url: req.url,
      query: req.query,
      headers: req.headers
    }
  }

  function resSerializer(res) {
    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: res.body
    }
  }
}

Logger.prototype.getStreams = function (opts) {
  var filePath
  var streams = []
  if (opts.stdout) {
    streams.push({
      stream: process.stdout,
      level: opts.stdout.level
    })
  }

  if (opts.file && opts.file.path) {
    var fileName = opts.name + '.log'

    if (process.env.PM2_NAME) {
      fileName = process.env.PM2_NAME + '.log'
    }

    filePath = path.resolve(opts.file.path, fileName)
    // see http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback 
    //  bfor a+ flag description
    streams.push({
      level: opts.file.level,
      stream: fs.createWriteStream(filePath, {flags: 'a+'}) 
    })

  }
  return streams
}

module.exports = new Logger()

