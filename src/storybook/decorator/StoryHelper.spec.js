import StoryHelper from "./StoryHelper";

describe("StoryHelper.getParentIds", () =>
{
  test("returns the kind of a story", () => {
    const story = {
      id: 'simple--story',
      kind: 'Simple',
      name: 'story'
    }
    const parents = StoryHelper.getParentIds(story)
    expect(parents).toEqual(['simple'])
  })

  test("returns title together with kind", () => {
    const story = {
      id: 'title-simple--story',
      kind: 'Title|Simple',
      name: 'story'
    }
    const parents = StoryHelper.getParentIds(story)
    expect(parents).toEqual(['title-simple'])
  })

  test("returns kind plus folders", () => {
    const story = {
      id: 'my-app-buttons-simple--with-text',
      kind: 'My App/Buttons/Simple',
      name: 'with text'
    }
    const parents = StoryHelper.getParentIds(story)
    expect(parents).toEqual(['my-app', 'my-app-buttons', 'my-app-buttons-simple'])
  })
})
