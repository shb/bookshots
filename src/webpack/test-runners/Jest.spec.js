const JestRunner = require('./Jest')

describe("Jest test runner", () => {
  test("getParams", () => {
    const jestRunner = new JestRunner({
      outputFile: 'some_file.json'
    })
    expect(jestRunner.getParams()).toEqual('--all --json --color=false --outputFile=some_file.json')
  })
})