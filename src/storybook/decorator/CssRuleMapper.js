export default class CssRuleMapper
{
  constructor (options) {
    this.stylesheet = undefined;
    Object.assign(this, options || {})
    this.rules = new Map;
  }

  set (selector, style) {
    this.rules.set(selector, style)
    this.refreshRules()
  }

  delete(selector) {
    this.rules.delete(selector)
    this.refreshRules()
  }

  refreshRules () {
    while (this.stylesheet.cssRules.length > 0) {
      this.stylesheet.deleteRule(0)
    }

    this.rules.forEach((style, selector) => {
      const rule = `${selector} ${style}`
      this.stylesheet.insertRule(rule, this.stylesheet.cssRules.length)
    })
  }
}