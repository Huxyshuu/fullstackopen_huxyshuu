import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  return (
    all
      ? (
        <div>
          <h2>statistics</h2>
          <table>
            <tbody>
              <tr><StatisticLine text="good" value={good} /></tr>
              <tr><StatisticLine text="neutral" value={neutral} /></tr>
              <tr><StatisticLine text="bad" value={bad} /></tr>
              <tr><StatisticLine text="all" value={all} /></tr>
              <tr><StatisticLine text="average" value={average} /></tr>
              <tr><StatisticLine text="positive" value={positive + ' %'} /></tr>
            </tbody>
          </table>
        </div>
      )
      : (
        <p>No feedback given</p>
      )
  )
}

export default Statistics