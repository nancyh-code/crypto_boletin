import { Button } from '@material-ui/core'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { chartOptions } from '../chartOptions'
import { useSelector } from 'react-redux'
import { selectFreq } from '../features/FreqSlice'

const VolumeChart = ({ volumes: { dailyVolumes, weeklyVolumes, yearlyVolumes }, id }) => {
  const freq = useSelector(selectFreq)
  let frequency

  switch (freq) {
    case '24h':
      frequency = dailyVolumes;
      break;
    case '7d':
      frequency = weeklyVolumes;
      break;
    case '365d':
      frequency = yearlyVolumes;
      break;
  }
  return (
    <div className='container-chart'>
      <Bar data={{
        labels: [],
        datasets: [{
          label: `${id} daily volumes`,
          fill: true,
          backgroundColor: 'rgba(255,99,132,0.30)',
          borderColor: '#F85F73',
          data: frequency,
        }]
      }}
        width={800} height={350} options={chartOptions}
      />
      <Button variant="outlined">24h</Button>
      <Button variant="outlined">1week</Button>
      <Button variant="outlined">1year</Button>
    </div>
  )
}

export default VolumeChart
