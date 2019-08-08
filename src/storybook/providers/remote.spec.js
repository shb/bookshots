import RemoteReportProvider from "./remote";

describe("RemoteReportProvider", () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  test("fetches reports through http", done => {
    fetch.mockResponse(JSON.stringify({}))
    new RemoteReportProvider({
      host: 'localhost',
      port: 8888,
      onNewReport: () => {
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8888')
        done()
      }
    })
  })

  test("re-requests a new report after the previous has been received", done => {
    fetch.mockResponse(JSON.stringify({}))
    let i = 1
    new RemoteReportProvider({
      host: 'localhost',
      port: 8888,
      onNewReport: report => {
        expect(fetch.mock.calls.length).toEqual(i++)
        if (i >= 2) done()
      }
    })
  })

  test("can retrieve last report with getReport", done => {
    fetch.mockResponse(JSON.stringify({ imPoorReport: true }))
    const provider = new RemoteReportProvider({
      host: 'localhost',
      port: 8888,
      onNewReport: () => {
        expect(provider.getReport()).toHaveProperty('imPoorReport', true)
        done()
      }
    })
  })
})