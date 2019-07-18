import JestReport from './JestReport';
import StaticReportProvider from './providers/static';

describe("JestReport", () => {

  let provider
  let report

  beforeEach(() => {
    provider = new StaticReportProvider('../__fixtures__/jest-report.json')
    report = new JestReport(provider)
    report.load()
  })

  it("can give results for a story", () => {
    const story = {
      id: 'timeline--regular',
      kind: 'Timeline',
      name: 'Regular',
      parent: 'timeline',
      story: 'Regular',
      isLeaf: true
    }
    const results = report.getStoryResults(story)
    expect(results).toHaveLength(2)
  })

  it("can find results", () => {
    const results = report.queryAssertions().getResults()
    expect(results).toHaveLength(10)
  })

  it("can find failed assertions", function () {
    const results = report.queryAssertions(a => a.status !== 'passed').getResults()
    expect(results).toHaveLength(4)
  })

  it("can concatenate test filters", function () {
    const results = report.queryAssertions()
      .filter(a => a.status !== 'passed')
      .filter(a => a.title === "Regular")
      .getResults()
    expect(results).toHaveLength(2)
  })
})