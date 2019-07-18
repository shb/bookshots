import React from 'react'

export default function HighlightedDiff({ text }) {
  const lines = text.split("\n")
  const out = lines.map((line, n) => {
    switch (line[0]) {
      case '-': return <span key={n} style={{ color: 'red' }}>{line + "\n"}</span>
      case '+': return <span key={n} style={{ color: 'green' }}>{line + "\n"}</span>
      case '@': return <span key={n} style={{ color: 'darkgoldenrod' }}>{line + "\n"}</span>
      default: return <span key={n}>{line + "\n"}</span>
    }
  })
  return <pre style={{ margin: '1em 0' }}>
    {out}
  </pre>
}
