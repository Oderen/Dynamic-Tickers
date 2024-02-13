import React, { useState, useEffect } from 'react';
import { ICompany } from '../types/companyType';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getCompanies } from '../redux/server-operations';

import CompanyList from '../components/CompanyList';
import IntervalField from '../components/IntervalField';
import { io, Socket } from 'socket.io-client';
import Loader from './Loader';

interface Props {
  type: string;
}

const Page: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [interval, setInterval] = useState<number>(5);
  const isLoading = useAppSelector(state => state.items.isLoading);

  useEffect(() => {
    const handleTicker = async (data: ICompany[]) => {
      await dispatch(getCompanies(data));
    };

    if (!socket) {
      const newSocket = io('http://localhost:4000');
      setSocket(newSocket);
    } else {
      socket.emit('start');
      socket.on('ticker', handleTicker);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [dispatch, socket]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-full flex flex-col items-center gap-6 px-6 pt-6 pb-20 bg-slate-200">
      <IntervalField
        fetchingInterval={interval}
        changeInterval={setInterval}
        socket={socket}
      />
      <CompanyList fetchingInterval={interval} type={type} />
    </div>
  );
};

export default Page;
