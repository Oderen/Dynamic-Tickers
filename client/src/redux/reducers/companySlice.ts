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
  watchlist: ICompany[];
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

            return {
              ...el,
              color:
                Number(el.change) > Number(state.companies[idx].change)
                  ? 'green'
                  : 'red',
              lastTradeDiff: findTimeDifference(prevTime, currentTime),
            };
          });
        }

        state.companies = modifyData;
      })
      .addCase(addToWatchList.fulfilled, (state, { payload }) => {
        if (
          state.watchlist.some(company => company.ticker === payload.ticker)
        ) {
          state.watchlist = [...state.watchlist];
        } else {
          state.watchlist = [...state.watchlist, payload];
        }
      })

      .addCase(deleteFromWatchList.fulfilled, (state, { payload }) => {
        const filteredArray = Array.from(state.watchlist).filter(
          company => company.ticker !== payload
        );

        state.watchlist = filteredArray;
      });
  },
});

export default companySlice.reducer;
