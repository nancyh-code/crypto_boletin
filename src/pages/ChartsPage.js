import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseEndPoint from '../apis/coinGecko'
import PriceChart from '../components/PriceChart'
import VolumeChart from '../components/VolumeChart'

//useParams permite capturar el id por medio de la ruta (parámetro)

//Hay que transformar la data de array a objeto para poder usar la librería de graficos
const formatData = data => {
  console.log(data);
  return data.map((coord) => {
    return {

      t: coord[0],
      y: coord[1]
    }
  })
}

const ChartsPage = () => {
  const { id } = useParams()
  const [prices, setPrices] = useState({})
  const [volumes, setVolumes] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {

      const [day, week, year] = await Promise.all([
        baseEndPoint.get(`coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '1'
          }
        }),
        baseEndPoint.get(`coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '7'
          }
        }),
        baseEndPoint.get(`coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '365'
          }
        })
      ])
      //Promise all, para hacer más eficiente la llamada a múltiples promesas, las respuestas son más rápidas
      setPrices({
        dailyPrices: formatData(day.data.prices),
        weeklyPrices: formatData(week.data.prices),
        yearlyPrices: formatData(year.data.prices)
      })
      setVolumes({
        dailyVolumes: formatData(day.data.total_volumes),
        weeklyVolumes: formatData(week.data.total_volumes),
        yearlyVolumes: formatData(year.data.total_volumes)
      })
      setIsLoading(false)
      console.log('day prices:', day.data.prices)
      console.log('day prices format:', prices.dailyPrices);
    }
    fetchData();
  }, [id])

  return (
    <>
      {
        isLoading ? <h1>Loading...</h1> : (
          <div>
            <PriceChart prices={prices} id={id} />
            <VolumeChart volumes={volumes} id={id} />
          </div>
        )
      }
    </>
  )
}

export default ChartsPage
