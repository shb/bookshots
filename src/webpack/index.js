const { Server } = require('http')

const TestSuite = require('./TestSuite')

const REQUEST_TIMEOUT = 60000

module.exports = class BookShotsWebpackPlugin {
  constructor(options) {
    console.log("Initializing BookShots webpack plugin", options)

    Object.assign(this, {
      port: 8888
    }, options)

    this._testSuite = new TestSuite

    this.server = new Server
    this.server.on('request', (req, res) => this.handleRequest(req, res))
  }

  handleRequest(req, res) {
    req.start = req.start || Date.now()

    if (this.reportStream) {
      res.statusCode = 200
      this.reportStream.pipe(res)
      delete this.reportStream
    } else {
      if (Date.now() - req.start > REQUEST_TIMEOUT) {
        res.statusCode = 204
        res.end()
        return
      } else {
        setImmediate(() => { this.handleRequest(req, res) })
      }
    }
  }

  apply(compiler) {
    this.server.listen(this.port)

    compiler.hooks.watchRun.tapPromise('BookShots', async compiler => {
      this._testSuite.run().then(report => {
        this.reportStream = report.getReadStream()
      })
    })
  }
}
