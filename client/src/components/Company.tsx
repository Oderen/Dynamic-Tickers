import React, { useEffect, useState } from 'react';
import { ICompany } from '../types/companyType';
import {
  IoIosArrowRoundUp,
  IoMdAdd,
  IoMdCheckmarkCircleOutline,
} from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addToWatchList,
  deleteFromWatchList,
} from '../redux/server-operations';

import Reveal from './Reveal';
import Wrapper from './Wrapper';

interface Props {
  company: ICompany;
  index: number;
  isListGeneral: boolean;
}

interface IDynamicColor {
  color: string | undefined;
}

const Company: React.FC<Props> = ({ company, index, isListGeneral }) => {
  const dispatch = useAppDispatch();

  const [btnText, setBtnText] = useState<React.ReactNode | string>(null);
  const watchList: ICompany[] = useAppSelector(state => state.items.watchlist);

  const {
    price,
    change,
    change_percent,
    dividend,
    color,
    lastTradeDiff = 'n/a',
  } = company;

  // eslint-disable-next-line
  const [date, _] = company.last_trade_time.split(/[T.]/);
  const shouldItemChangeBgColor: boolean = index % 2 === 0;
  const dynamicPriceColor: IDynamicColor = { color };
  const isItemInWatchList: boolean = watchList.some(
    el => el.ticker === company.ticker
  );
  const tickerColors: string[] = [
    '#737373',
    '#3CAB5A',
    '#C26C03',
    '#FF9900',
    '#415CA0',
    '#1C1C1E',
  ];

  const editWatchList: Function = (): void => {
    if (isListGeneral) {
      dispatch(addToWatchList(company));
    } else {
      dispatch(deleteFromWatchList(company.ticker));
    }
  };

  const renderBtn: Function = (): React.ReactNode => {
    return (
      <button
        className="w-[35px] h-[35px] border border-black px-2 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white transition-all"
        type="button"
        onClick={() => editWatchList()}
      >
        {btnText}
      </button>
    );
  };

  const renderDiv: Function = (): React.ReactNode => {
    return (
      <div className="w-[35px] h-[35px] border border-slate-500 px-2 py-2 rounded-full">
        <IoMdCheckmarkCircleOutline className="w-full h-full text-slate-500" />
      </div>
    );
  };

  useEffect(() => {
    const updateBtnText = () => {
      if (!isListGeneral) {
        setBtnText(<MdDelete className="w-full h-full" />);
        return;
      } else {
        isItemInWatchList
          ? setBtnText('Added')
          : setBtnText(<IoMdAdd className="w-full h-full" />);
      }
    };

    updateBtnText();
  }, [company, watchList, isListGeneral, isItemInWatchList]);

  return (
    <li
      className={`item ${shouldItemChangeBgColor ? 'bg-gray-200' : 'bg-white'}`}
    >
      <span
        style={{
          backgroundColor: tickerColors[index],
        }}
        className="flex justify-center items-center px-1 py-1 w-[60px] text-white text-sm  font-medium rounded-md"
      >
        {company.ticker}
      </span>
      <span className="font-medium">{company.exchange}</span>
      <Wrapper>
        <span>$</span>
        <Reveal item={price}>
          <span className="price">{`${price}`}</span>
        </Reveal>
      </Wrapper>

      <div className="flex flex-col items-center">
        <Wrapper>
          <span style={dynamicPriceColor}>$</span>
          <Reveal item={change}>
            <span
              className={`font-medium`}
              style={dynamicPriceColor}
            >{`${change}`}</span>
          </Reveal>
        </Wrapper>

        <div className="flex items-center">
          <IoIosArrowRoundUp
            style={dynamicPriceColor}
            className={`w-5 h-[30px] ml-[-5px] ${
              color === 'red-500' ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <Wrapper>
            <Reveal item={change_percent}>
              <span
                style={dynamicPriceColor}
                className={`text-${color} font-medium`}
              >{`${change_percent}`}</span>
            </Reveal>
            <span style={dynamicPriceColor}>%</span>
          </Wrapper>
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <Wrapper>
          <span>$</span>
          <Reveal item={dividend}>
            <span>{`${dividend}`}</span>
          </Reveal>
          <span>/</span>
        </Wrapper>

        <Wrapper>
          <Reveal item={company.yield}>
            <span>{company.yield}</span>
          </Reveal>
          <span>%</span>
        </Wrapper>
      </div>
      <div className="flex flex-col items-center w-[70px]">
        <div className="flex items-center text-sm">
          <Reveal item={lastTradeDiff}>
            <span className="mt-[-1px] mr-[2px] text-xl text-blackGold font-medium">
              {lastTradeDiff}
            </span>
          </Reveal>
          <span className="text-sm">sec ago</span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">{date}</span>
      </div>

      {btnText === 'Added' ? renderDiv() : renderBtn()}
    </li>
  );
};

export default Company;
