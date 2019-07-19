module.exports = class JestRunner {

  constructor(options) {
    Object.assign(this, {
      outputFile: '/dev/null'
    }, options || {})
  }

  getParams(options) {
    Object.assign(this, options || {})
    return `--all --json --color=false --outputFile=${this.outputFile}`
  }
}