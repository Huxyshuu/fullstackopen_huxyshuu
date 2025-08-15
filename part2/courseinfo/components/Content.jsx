import React from 'react'
import Part from './Part'

export default function Content({ parts }) {
  return (
    <>
        {parts.map((item) => (
            <Part key={item.id} item={item} />
        ))}
    </>
  )
}
