import RequestReport from "./ReportRequest";

describe("RequestReport", () =>
{
  test("isWaitingForTooLong", done =>{
    const req = new RequestReport()
    req.REQUEST_TIMEOUT = 100
    req.startWaiting()
    expect(req.isWaitingForTooLong()).toBe(false)
    setTimeout(() => {
      expect(req.isWaitingForTooLong()).toBe(true)
      done()
    }, 101)
  })

  test("waitForReport reject/throws after waiting for too long", async () => {
    const req = new RequestReport()
    req.REQUEST_TIMEOUT = 100
    try {
      await req.waitForReport()
    } catch (e) {
      expect(e).toMatchSnapshot()
    }
  })

  test("waitForReport resolves after updating the report", done => {
    const req = new RequestReport()
    req.REQUEST_TIMEOUT = 100
    setImmediate(() => {
      req.updateReport("report!")
    })
    req.waitForReport().then(report => {
      expect(report).toEqual("report!")
      done()
    }).catch(done)
  })

  test("waitForReport only resolves to an updated report once", done => {
    const req = new RequestReport()
    req.REQUEST_TIMEOUT = 100
    setImmediate(() => {
      req.updateReport("report!")
    })
    req.waitForReport().then(report => {
      expect(report).toEqual("report!")
    })
    .then(async () => {
      const start = Date.now()
      try {
        await req.waitForReport()
      } catch (e) {
        expect(e).toMatchSnapshot()
        expect(Date.now() - start > 99).toBe(true)
        done()
      }
    })
    .catch(done)
  })

  test("waitForReport start waiting from scratch after a timeout", async () => {
    const req = new RequestReport()
    req.REQUEST_TIMEOUT = 100
    let start
    try {
      start = Date.now()
      await req.waitForReport()
    } catch (e) {
      expect(Date.now() - start).toBeGreaterThan(99)
    }
    try {
      start = Date.now()
      await req.waitForReport()
    } catch (e) {
      expect(Date.now() - start).toBeGreaterThan(99)
    }
  })
})