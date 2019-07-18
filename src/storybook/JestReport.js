export default class JestReport {
  provider = null;
  report = null;
  results = []

  constructor(provider) {
    this.provider = provider;
  }

  getStoryResults(story) {
    return this.queryAssertions(a => a.ancestorTitles[1] === story.kind && a.title === story.name).getResults()
  }

  filterStory(story) {
    return this.filter(a => a.ancestorTitles[1] === story.kind && a.title === story.name)
  }

  filterFailed () {
    return this.filter(a => a.status === 'failed')
  }

  getResults() {
    return this.results
  }

  load(name) {
    this.report = this.provider.getReport()
    this.results = this.report.testResults
      .filter(s => s.name === name)
      .reduce((results, suite) => results.concat(suite.assertionResults), [])
    return this
  }

  queryAssertions(predicate) {
    this.results = this.report.testResults.reduce((results, test) =>
      results.concat(test.assertionResults)
      , []);
    return predicate ? this.filter(predicate) : this
  }

  filter(predicate) {
    this.results = this.results.filter(predicate)
    return this
  }
}
