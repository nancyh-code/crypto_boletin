import React from 'react'
import { TableRow, TableCell } from '@material-ui/core/';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import TimelineIcon from '@material-ui/icons/Timeline';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import { CryptoImageCell, CryptoDeleteCell } from './styles';
import accounting from 'accounting'
import { useSelector, useDispatch } from 'react-redux'
import { selectCrypto, DELETE_CRYPTO } from '../../features/CryptoSlice'

const CoinRow = ({ data: { id, image, symbol, current_price, market_cap_rank, price_change_percentage_24h, high_24h, low_24h } }) => {

  const crypto = useSelector(selectCrypto)
  const dispatch = useDispatch()

  const deleteCrypto = (e, id) => {
    e.preventDefault()
    //convención para filtrar o modificar  una variable: _crypto
    const _crypto = crypto.filter((item) => item !== id)
    dispatch(DELETE_CRYPTO(_crypto))
  }

  return (
    <TableRow className="table-row">
      <CryptoImageCell >
        {<img src={image} alt="coin" />}
      </CryptoImageCell>
      <TableCell >{symbol}</TableCell>
      <TableCell >{accounting.formatMoney(current_price)}</TableCell>
      <TableCell >{market_cap_rank}</TableCell>
      <TableCell >{accounting.formatMoney(high_24h)}</TableCell>
      <TableCell >{accounting.formatMoney(low_24h)}</TableCell>
      <TableCell >
        <Link to={`/cryptocurrency/${id}`}>
          <TimelineIcon style={{ color: "#10c6ea", cursor: "pointer" }} />
        </Link>
      </TableCell>
      <CryptoDeleteCell >
        {price_change_percentage_24h > 0 ? (
          <div>
            <ArrowDropUpIcon style={{ color: "#23d405" }} />
            <span style={{ color: "#23d405" }}>
              {price_change_percentage_24h}
            </span>
          </div>
        ) : price_change_percentage_24h === 0 ? (
          <div>
            {price_change_percentage_24h}
          </div>
        ) : (
          <div>
            <ArrowDropDownIcon style={{ color: "#dd0606" }} />
            <span style={{ color: "#dd0606" }}>
              {price_change_percentage_24h}
            </span>
          </div>
        )
        }
        <span
          className="delete-crypto"
          onClick={e => deleteCrypto(e, id)}
        >
          <DeleteIcon />
        </span>
      </CryptoDeleteCell>

    </TableRow>
  )
}

export default CoinRow
