module.exports = class RequestReport
{
  constructor (options)
  {
    this.REQUEST_TIMEOUT = 60000;
    Object.assign(this, options || {})
  }

  updateReport (report)
  {
    this.report = report
  }

  async waitForReport () {
    if (!this.startedWaiting) this.startWaiting()
    else if (this.isWaitingForTooLong()) {
      this.stopWaiting()
      throw new Error("Timeout")
    }

    if (this.report) return this.getReportAndReset()
    else return await this.waitAnotherBit()
  }

  waitAnotherBit () {
    return new Promise(resolve => {
      nextFrame(() => {
        resolve(this.waitForReport())
      })
    })
  }

  getReportAndReset () {
    const report = this.report
    delete this.report
    this.stopWaiting()
    return report
  }

  startWaiting() {
    this.startedWaiting = Date.now()
  }

  stopWaiting () {
    delete this.startedWaiting
  }

  isWaitingForTooLong() {
    if (!this.startedWaiting) return false
    return Date.now() - this.startedWaiting > this.REQUEST_TIMEOUT
  }
}

function nextFrame (fn) {
  setTimeout(fn, 33)  // NTSC, because so
}