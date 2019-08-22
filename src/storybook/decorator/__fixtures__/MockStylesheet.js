export default  class MockStylesheet
{
  constructor () {
    this.rules = []
  }

  get cssRules () {
    const mock = this
    return {
      get length () {
        return mock.rules.length
      }
    }
  }

  insertRule (rule, index) {
    this.rules.splice(index || 0, 0, rule)
  }

  deleteRule (index) {
    this.rules.splice(index, 1)
  }

  toString() {
    return this.rules.join("\n")
  }
}