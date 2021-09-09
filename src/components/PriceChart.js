import React from 'react'
import { Button } from '@material-ui/core'
import { Line } from 'react-chartjs-2'
import { chartOptions } from '../chartOptions'
import { useDispatch, useSelector } from 'react-redux'
import { SET_FREQ, selectFreq } from '../features/FreqSlice'


const PriceChart = ({ prices: { dailyPrices, weeklyPrices, yearlyPrices }, id }) => {
  const freq = useSelector(selectFreq)
  const dispatch = useDispatch()
  let frequency

  switch (freq) {
    case '24h':
      frequency = dailyPrices;
      break;
    case '7d':
      frequency = weeklyPrices;
      break;
    case '365d':
      frequency = yearlyPrices;
      break;
  }

  return (
    <div>
      <Line data={{
        labels: [],
        datasets: [{
          label: `${id} daily prices`,
          fill: true,
          backgroundColor: 'rgba(255,99,132,0.30)',
          borderColor: '#F85F73',
          pointStyle: 'circle',
          data: frequency
          
        }]
      }}
        width={800} height={350} options={chartOptions}
      />
      <Button variant="outlined" onClick={() => dispatch(SET_FREQ('24h'))}>24h</Button>
      <Button variant="outlined" onClick={() => dispatch(SET_FREQ('7d'))}>1week</Button>
      <Button variant="outlined" onClick={() => dispatch(SET_FREQ('365d'))}>1year</Button>
    </div>
  )
}

export default PriceChart
