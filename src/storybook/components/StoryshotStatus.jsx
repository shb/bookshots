import React from 'react'

export default function StoryshotStatus({ children, results }) {
  return (
    <span>
      {results.length ? '❌' : '✅'} {children}
    </span>
  )
}
