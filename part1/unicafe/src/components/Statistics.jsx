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
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive + ' %'} />
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