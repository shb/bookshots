import StaticReportProvider from "./static";

describe("StaticReportProvider", () => {

  const sampleReportFile = '../__fixtures__/jest-report.json'
  
  it("loads a json report string", () => {
    const prov = new StaticReportProvider(require(sampleReportFile))
    expect(prov.getReport()).toHaveProperty('imPoorReport', true)
  })
})