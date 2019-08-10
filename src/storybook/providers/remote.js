export default class RemoteReportProvider
{
  constructor (options) {
    Object.assign(this, {
      host: 'localhost',
      fetch: (input, init) => fetch(input, init),
      onError: console.error
    }, options)
    this.request()
  }

  getReport () {
    return this.report
  }

  async request () {
    try {
      const res = await this.fetch(`http://${this.host}:${this.port}`)
      this.report = await res.json()
      if (this.onNewReport) {
        this.onNewReport(this.report)
      }
    } catch (err) {
      if (this.onError) {
        this.onError(err)
      }
    } finally {
      setTimeout(() => {
        this.request()
      }, 1)
    }
  }
}