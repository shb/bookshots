import CssRuleMapper from './CssRuleMapper'
import MockStylesheet from './__fixtures__/MockStylesheet';

describe("CssRule mapper", () =>
{
  test("inserting one rule", () => {
    const stylesheet = new MockStylesheet
    const map = new CssRuleMapper({ stylesheet })
    map.set('#id', '{ color:red }')
    expect(stylesheet.toString()).toBe(`#id { color:red }`)
  })

  test("inserting two rules", () => {
    const stylesheet = new MockStylesheet
    const map = new CssRuleMapper({ stylesheet })
    map.set('#id1', '{ color:red }')
    map.set('#id2', '{ color:blue }')
    expect(stylesheet.toString()).toBe(`#id1 { color:red }\n#id2 { color:blue }`)
  })

  test("deleting and inserting", () => {
    const stylesheet = new MockStylesheet
    const map = new CssRuleMapper({ stylesheet })
    map.set('#id1', '{ color:red }')
    map.set('#id2', '{ color:red }')
    map.delete('#id1')
    map.set('#id1', '{ color:blue }')
    expect(stylesheet.toString()).toBe(`#id2 { color:red }\n#id1 { color:blue }`)
  })

})
