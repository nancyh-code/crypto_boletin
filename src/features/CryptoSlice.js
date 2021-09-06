import { createSlice } from '@reduxjs/toolkit'

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    crypto: ['bitcoin', 'ethereum', 'cardano', 'litecoin', 'tether', 'solana', 'dogecoin', 'polkadot', 'uniswap']
  },
  reducers: {
    SET_CRYPTO: (state, action) => {
      state.crypto = action.payload
    },
    ///Ambos reducer manejan lo mismo, se colocaron nombres diferentes para observar mejor la acción
    DELETE_CRYPTO: (state, action) => {
      state.crypto = action.payload
    }
  }
})

export const { SET_CRYPTO, DELETE_CRYPTO } = cryptoSlice.actions
export const selectCrypto = (state) => state.crypto.crypto

export default cryptoSlice.reducer
