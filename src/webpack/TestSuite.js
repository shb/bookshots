const { createReadStream } = require('fs')

const tmp = require('tmp')

const packageManagers = require('./package-managers')
const testRunners = require('./test-runners')

module.exports = class TestSuite {

  constructor(options) {
    Object.assign(this, options)

    this._packageManager = this.getPackageManager()
    this._testRunner = this.getTestRunner()
  }

  run() {
    console.info("[Bookshots] Updating StoryShots results in background...")

    return new Promise((resolve, reject) => {
      tmp.file(async (err, path, fd, clean) => {
        if (err) {
          reject(err)
          return
        }

        this._tmpPath = path
        // Obtain test runner additional params
        const testParams = this._testRunner.getParams({
          outputFile: path
        })

        // Run test command with additional params
        await this._packageManager.run('test', testParams)

        resolve(this)
      })
    })
  }

  getReadStream() {
    return createReadStream(this._tmpPath)
  }

  getPackageManager() {
    // TODO: Identify package manager
    return new packageManagers.npm
  }

  getTestRunner(options) {
    // TODO: Identify test runner
    return new testRunners.jest(options)
  }
}
