import { createSlice } from '@reduxjs/toolkit';
import { ICompany } from '../../types/companyType';
import { findTimeDifference, takeOutTime } from '../../utils';

import {
  getCompanies,
  addToWatchList,
  deleteFromWatchList,
} from '../server-operations';

interface CompaniesState {
  companies: ICompany[];
  watchlist: string[];
  isLoading: boolean;
  error: null | string;
}

const initialState: CompaniesState = {
  companies: [],
  watchlist: [],
  isLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCompanies.fulfilled, (state, { payload }) => {
        let modifyData;
        if (state.companies.length === 0) {
          modifyData = [...payload].map(el => ({
            ...el,
            color: 'green',
            lastTradeDiff: 'n/a',
          }));
        } else {
          modifyData = [...payload].map((el, idx) => {
            const prevTime = takeOutTime(state.companies[idx].last_trade_time);
            const currentTime = takeOutTime(el.last_trade_time);
            const timeDifference =
              findTimeDifference(prevTime, currentTime) < 0
                ? 'n/a'
                : findTimeDifference(prevTime, currentTime);

            return {
              ...el,
              color:
                Number(el.change) > Number(state.companies[idx].change)
                  ? 'green'
                  : 'red',
              lastTradeDiff: timeDifference,
            };
          });
        }

        state.companies = modifyData;
        state.isLoading = false;
      })
      .addCase(getCompanies.pending, state => {
        state.isLoading = true;
      })
      .addCase(addToWatchList.fulfilled, (state, { payload }) => {
        if (state.watchlist.some(ticker => ticker === payload)) {
          state.watchlist = [...state.watchlist];
        } else {
          state.watchlist = [...state.watchlist, payload];
        }
      })
      .addCase(deleteFromWatchList.fulfilled, (state, { payload }) => {
        const filteredArray = Array.from(state.watchlist).filter(
          ticker => ticker !== payload
        );

        state.watchlist = filteredArray;
      });
  },
});

export default companySlice.reducer;
