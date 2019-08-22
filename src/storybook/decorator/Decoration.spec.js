import Decoration from "./Decoration";

describe("Decoration", () =>
{
  it("badge", () => {
    const badge = new Decoration('badge', {
      color: 'red',
      content: "content"
    })
    expect(badge.toString()).toMatchSnapshot()
  })

  it("bullet", () => {
    const badge = new Decoration('bullet', {
      color: 'red'
    })
    expect(badge.toString()).toMatchSnapshot()
  })

})