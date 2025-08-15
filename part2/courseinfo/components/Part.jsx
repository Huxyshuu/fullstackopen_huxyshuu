import React from 'react'

export default function Part({ item }) {
  return (
    <p>{item.name} {item.exercises}</p>
  )
}
