export function addStylesheet (title)
{
  let sheet = getStylesheet(title)
  if (!sheet) {
    const style = document.createElement('style')
    style.title = title
    style.type = 'text/css'
    document.head.appendChild(style)
    sheet = getStylesheet(title)
  }
  return sheet
}

export function getStylesheet (title) {
  for (let s = document.styleSheets.length-1; s >= 0; s--) {
    const sheet = document.styleSheets[s]
    if (sheet.title === title || sheet.ownerNode.title === title) {
      return sheet
    }
  }
}