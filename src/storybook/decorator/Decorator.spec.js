import Decorator from './Decorator'
import CssRuleMapper from './CssRuleMapper';
import MockStylesheet from './__fixtures__/MockStylesheet';

describe("Decorator", () =>
{
  let stylesheet
  let deco

  beforeEach(() => {
    stylesheet = new MockStylesheet
    const mapper = new CssRuleMapper({ stylesheet })
    deco = new Decorator({ mapper })
  })

  test("flagging one story", () => {
    const story = {
      id: 'button--simple',
      kind: "Button",
      name: 'simple'
    }
    deco.flagStory(story)
    expect(stylesheet.toString()).toMatchSnapshot()
  })

  test("flag two sibling stories", () => {
    const story1 = {
      id: 'button--simple',
      kind: "Button",
      name: 'simple'
    }
    const story2 = {
      id: 'button--not-so-simple',
      kind: "Button",
      name: 'not-so-simple'
    }
    deco.flagStory(story1)
    deco.flagStory(story2)
    expect(stylesheet.toString()).toMatchSnapshot()
  })

  test("unflagging a story", () => {
    const story1 = {
      id: 'button--simple',
      kind: "Button",
      name: 'simple'
    }
    deco.flagStory(story1)
    deco.unflagStory(story1)
    expect(stylesheet.toString()).toMatchSnapshot()
  })

  test("unflagging one of two sibling flagged stories", () => {
    const story1 = {
      id: 'button--simple',
      kind: "Button",
      name: 'simple'
    }
    const story2 = {
      id: 'button--not-so-simple',
      kind: "Button",
      name: 'not-so-simple'
    }
    deco.flagStory(story1)
    deco.flagStory(story2)
    deco.unflagStory(story1)
    expect(stylesheet.toString()).toMatchSnapshot()
  })
})
