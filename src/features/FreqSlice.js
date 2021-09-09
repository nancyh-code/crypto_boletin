import { createSlice } from '@reduxjs/toolkit'

export const freqSlice = createSlice({
  name: "freq",
  initialState: {
    freq: ""
  },
  reducers: {
    SET_FREQ: (state, action) => {
      state.freq = action.payload

    }
  }
})

export const { SET_FREQ } = freqSlice.actions;
export const selectFreq = (state) => state.freq.freq;

export default freqSlice.reducer
