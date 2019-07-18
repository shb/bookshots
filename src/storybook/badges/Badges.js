export * from "./styles";

export default class Badges {
  constructor() {
    this.name = 'storybook-badges-' + Math.round(Date.now() * Math.random())
    this.revision = 0
    this.badges = {}
  }

  add(id, badge) {
    this.badges[id] = badge
  }

  commit() {
    const prevRev = this.getRevision()
    this.deleteStylesheet(s => s.title === prevRev)

    const css = Object.entries(this.badges).reduce((css, entry) => css + `#${entry[0]}::after ${entry[1]}${"\n"}`, '')
    this.addStylesheet(prevRev).textContent = css
  }

  addStylesheet(title) {
    const style = document.createElement('STYLE')
    style.setAttribute('title', title)
    style.setAttribute('type', 'text/css')
    document.head.appendChild(style)
    return style;
  }

  writeStylesheet(content) {
    let style = this.findStylesheet();
    if (!style) {
      style = this.addStylesheet()
    }
    style.innerText = content
  }

  deleteStylesheet(pred) {
    Array.prototype.filter.call(document.styleSheets, pred).forEach(sheet => {
      try {
        sheet.ownerNode.parentNode.removeChild(sheet.ownerNode)
      } catch (e) {
        console.error(e)
      }
    })
  }

  getRevision() {
    return `${this.name}-${this.revision}`
  }

  getNewRevision() {
    this.revision++
    return this.getRevision()
  }
}