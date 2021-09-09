import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from '../features/CryptoSlice'
import freqReducer from '../features/FreqSlice'


export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    freq: freqReducer,
  }
})

