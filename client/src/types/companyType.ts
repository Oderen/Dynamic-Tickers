export interface ICompany {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
  color?: string;
  lastTradeDiff?: number | string;
}
