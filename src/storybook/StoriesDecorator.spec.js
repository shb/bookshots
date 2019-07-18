import StoriesDecorator from './StoriesDecorator'

describe("StoriesDecorator", () => {
  it("addFailedStory starts counting failed sotries in a new kind", () => {
    const deco = new StoriesDecorator({})
    deco.addFailedStory({
      id: 'fake--story-id'
    })
    expect(deco.failedPerKind).toHaveProperty('fake', 1)
  })
})