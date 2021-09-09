import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import baseEndPoint from '../apis/coinGecko'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useSelector, useDispatch } from 'react-redux'
import { selectCrypto, ADD_CRYPTO } from '../features/CryptoSlice'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    width: 210,
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& .MuiSvgIcon-root": {
      marginRight: "1rem",
    }
  }
}));


const AddCoin = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState('')
  const [list, setList] = useState([])
  const dispatch = useDispatch()
  const crypto = useSelector(selectCrypto)

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseEndPoint.get("/coins/list", {
        params: {
          include_platform: false,
        }
      })
      setList(response.data)
      console.log("lista de cryptomonedas:", response);
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    if (crypto.indexOf(e.target.value) === -1);
    //si la crypto no esta en la lista, entonces la añadiremos
    dispatch(ADD_CRYPTO([...crypto, e.target.value]))
  }

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled" className={classes.inputLabel} ><AddCircleIcon /> Add Cryptocurrencies</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={selected}
          onChange={handleChange}
        //label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            list.slice(1000, 1030).map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>

  )
}

export default AddCoin
