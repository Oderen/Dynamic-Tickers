import React, { ReactNode } from 'react';
import TitleLine from './TitleLine';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ICompany } from '../types/companyType';
import Company from './Company';

interface Props {
  type: string;
  fetchingInterval: number;
}

const CompanyList: React.FC<Props> = ({ type, fetchingInterval }) => {
  const companies = useAppSelector((state: RootState) => state.items.companies);
  const fetchedWatchlist = useAppSelector(
    (state: RootState) => state.items.watchlist
  );
  const watchList = companies.filter(company => {
    return fetchedWatchlist.some(watchTicker => watchTicker === company.ticker);
  });
  const isListGeneral: boolean = type === 'general';
  const listToMap: ICompany[] = isListGeneral ? companies : watchList;
  const title: string = isListGeneral ? 'General List' : 'Watch List';

  const renderList: Function = (): ReactNode => {
    return (
      <ul className="w-[800px] min-h-[300px] h-fit flex flex-col">
        <TitleLine />
        {listToMap.map((company, index) => (
          <Company
            key={company.ticker}
            company={company}
            index={index}
            isListGeneral={isListGeneral}
          />
        ))}
      </ul>
    );
  };

  const renderSkeleton: Function = (): ReactNode => {
    return (
      <div className="flex justify-center items-center w-[800px] py-10 border-2 border-black">
        <span className="text-xl font-semibold">List is empty</span>
      </div>
    );
  };
  return (
    <div className="w-fit">
      <h2
        className="text-[30px] font-medium text-center"
        style={{ marginBottom: isListGeneral ? 0 : 30 }}
      >
        {title}
      </h2>

      <p className="inline-block mb-4 text-start font-medium ">
        Fetching Interval (sec):{' '}
        <span className="text-blackGold">{fetchingInterval}</span>
      </p>

      {listToMap.length === 0 ? renderSkeleton() : renderList()}
    </div>
  );
};

export default CompanyList;
