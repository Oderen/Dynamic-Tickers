import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICompany } from '../types/companyType';

export const getCompanies = createAsyncThunk<ICompany[], ICompany[]>(
  'companies/getAll',
  async data => {
    try {
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const addToWatchList = createAsyncThunk(
  'companies/addToWatch',
  async (watchTicker: string) => {
    try {
      return watchTicker;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const deleteFromWatchList = createAsyncThunk(
  'companies/deleteFromList',
  async (ticker: string) => {
    try {
      return ticker;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);
