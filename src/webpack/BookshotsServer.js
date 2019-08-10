const { Server } = require('http')

module.exports = class BookshotsServer {
  constructor(options) {
    Object.assign(this, options || {})
    this.httpServer = new Server
  }

  start () {
    this.httpServer.on('request', (req, res) => this.handleRequest(req, res))
    this.httpServer.listen(this.port)
  }

  handleRequest(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')

    this.requestHandler.waitForReport().then(report => {
      res.statusCode = 200
      report.pipe(res)
    }).catch(e => {
      res.statusCode = e.message == "Timeout"? 204 : 500
      res.end()
    })
  }
}