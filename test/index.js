var opts = {
  name: 'paul-bunyan-logger', 
  stdout: { 
    level: 'info' 
  }
}
var logger        = require('../index').init(opts)
var expect        = require('chai').expect
var captureStream = require('./hook')

describe('logger', function () {
  beforeEach(function(){
    hook = captureStream(process.stdout);
  })

  it('prints the argument', function(){
    logger.info({}, 'hi');
    var result = JSON.parse(hook.captured())

    expect(result.name).equal('paul-bunyan-logger')
    expect(result.level).equal(30)
    expect(result.msg).equal('hi')
  })

  afterEach(function(){
    hook.unhook()
  })

})
