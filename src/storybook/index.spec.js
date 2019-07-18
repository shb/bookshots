import * as index from './index'

describe("StorybookStoryshots", function () {
  it("exports a default init function", function () {
    expect(index).toHaveProperty('default')
  })
})