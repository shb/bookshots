import * as stylesheets from './'

xdescribe("stylesheet", () => {

  test("prototype", () => {
    const stylesheet = stylesheets.addStylesheet("Test")
    expect(stylesheet).toHaveProperty('title', "Test")
  })

})