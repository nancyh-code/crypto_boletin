import { Button } from '@material-ui/core'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { chartOptions } from '../chartOptions'

const VolumeChart = ({ volumes: { dailyVolumes, weeklyVolumes, yearlyVolumes }, id }) => {

  return (
    <div className='container-chart'>
      <Bar data={{
        labels: [],
        datasets: [{
          label: `${id} daily volumes`,
          data: dailyVolumes,
          fill: true,
          backgroundColor: 'rgba(255,99,132,0.30)',
          borderColor: '#F85F73',
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
