var path   = require('path')
var bunyan = require('bunyan')
var fs     = require('fs')
var config = require('config')

function Logger() {}

Logger.prototype.init = function () {
  var loggerName = config.log.name

  var loggerOpts = {
    name: loggerName,
    streams: this.getStreams(),
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
    error: bunyan.stdSerializers.err,
    logger: dummy
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

  function dummy() {}
}

Logger.prototype.getStreams = function () {
  var filePath
  var streams = []
  if (config.log.stdout) {
    streams.push({
      stream: process.stdout,
      level: config.log.stdout.level
    })
  }

  if (config.log.file && config.log.file.path) {
    var fileName = config.log.name + '.log'

    if (process.env.PM2_NAME) {
      fileName = process.env.PM2_NAME + '.log'
    }

    filePath = path.resolve(config.log.file.path, fileName)
    // see http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback 
    //  bfor a+ flag description
    streams.push({
      level: config.log.file.level,
      stream: fs.createWriteStream(filePath, {flags: 'a+'}) 
    })

  }
  return streams
}

module.exports = new Logger()

