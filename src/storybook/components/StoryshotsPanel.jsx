import React from 'react'

import HighlightedDiff from './HighlightedDiff'

export default function StoryshotPanel({ results }) {
  const mess = results.reduce((prev, current) => {
    const mess = current.failureMessages || []
    return prev.concat(mess.map(m => <HighlightedDiff text={m} />))
  }, [])
  return mess
}
