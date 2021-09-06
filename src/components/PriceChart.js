import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Line } from 'react-chartjs-2'
import { chartOptions } from '../chartOptions'



const PriceChart = ({ prices: { dailyPrices, weeklyPrices, yearlyPrices }, id }) => {
  const [freq, setFreq] = useState('24h')

  //console.log('dailyPricesDesdeChart:', dailyPrices);

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
          data: freq === '24h' ? dailyPrices : freq === '7d' ? weeklyPrices : yearlyPrices
        }]
      }}
        width={800} height={350} options={chartOptions}
      />
      <Button variant="outlined" onClick={() => setFreq('24h')}>24h</Button>
      <Button variant="outlined" onClick={() => setFreq('7d')}>1week</Button>
      <Button variant="outlined" onClick={() => setFreq('365')}>1year</Button>
    </div>
  )
}

export default PriceChart
