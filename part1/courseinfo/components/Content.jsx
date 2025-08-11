import React from 'react'
import Part from './Part'

export default function Content({ content }) {
  return (
    <>
        {content.map((item, index) => (
            <Part key={index} item={item} />
        ))}
    </>
  )
}
