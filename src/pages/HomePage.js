import React, { useState, useEffect } from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core/';
import baseEndPoint from '../apis/coinGecko'
import { styled } from '@material-ui/core/'
import { useSelector } from 'react-redux'
import { selectCrypto } from '../features/CryptoSlice'
import CoinRow from '../components/CoinRow/CoinRow'
import AddCoin from '../components/AddCoin'


const HeaderCell = styled(TableCell)({
  fontWeight: 800,
  fontSize: '16px',
  fontStyle: 'Italic'
})


const HomePage = () => {
  const crypto = useSelector(selectCrypto)
  const [coins, setCoins] = useState([])
  //Para probar si la data carga:
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await baseEndPoint.get("/coins/markets", {
          params: {
            vs_currency: "usd",
            ids: crypto.join(), //necesito unir el array en un string
            days: 7
          }
        })
        setCoins(response.data)
        setIsLoading(false)
        //console.log('coins:', coins);

      } catch (err) { console.log(err) }
    }
    if (crypto.length) {
      fetchData()
    } else {
      setCoins([])

    }

  }, [crypto])

  return (
    <>
      {
        isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <AddCoin />
            <TableContainer component={Paper}>
              <Table size='small' aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <HeaderCell>Image</HeaderCell>
                    <HeaderCell >Symbol</HeaderCell>
                    <HeaderCell>Current-Price</HeaderCell>
                    <HeaderCell>MktCap-Rank</HeaderCell>
                    <HeaderCell>High-Price-24h</HeaderCell>
                    <HeaderCell>Low-Price-24h</HeaderCell>
                    <HeaderCell>Charts</HeaderCell>
                    <HeaderCell>Price-1day-%</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coins.map(coin => (
                    <CoinRow key={coin.id} data={coin} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </>
        )
      }

    </>


  )
}

export default HomePage
