import Badges from "./Badges";

describe("Badges", () => {
  it("generates a unique name", () => {
    for (let i=0; i < 1000; i++) {
      const b1 = new Badges()
      const b2 = new Badges()
      expect(b1.name).not.toBe(b2.name)
    }
  })

  it("generate successive revisions", () => {
    const b = new Badges()
    expect(b.getNewRevision()).toMatch(/-1$/)
    expect(b.getNewRevision()).toMatch(/-2$/)
  })
})