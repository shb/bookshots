const BookshotsServer = require('./BookshotsServer');
const TestSuite = require('./TestSuite')
const ReportRequest = require('./ReportRequest')

module.exports = class BookShotsWebpackPlugin {
  constructor(options) {
    console.log("[BookShort] Initializing BookShots webpack plugin", options)

    this._testSuite = new TestSuite
    this._reportRequest = new ReportRequest
  
    Object.assign(this, {
      port: 8888
    }, options)
  }

  apply(compiler) {
    this.startServer()

    compiler.hooks.watchRun.tapPromise('BookShots', async () => {
      this.updateReport()
    })
  }

  startServer () {
    this.server = new BookshotsServer({
      port: this.port,
      requestHandler: this._reportRequest
    })
    this.server.start()
  }

  updateReport () {
    console.info("[Bookshots] Updating StoryShots results in the background...")
    return this._testSuite.run().then(report => {
      console.info("[Bookshots] Updating report")
      this._reportRequest.updateReport(report.getReadStream())
    })
  }
}
