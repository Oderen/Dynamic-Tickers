import Page from '../components/Page';

const Home: React.FC = () => {
  return <Page type="watchlist" />;
};

export default Home;

// import React, { useState, useEffect, useRef } from 'react';

// import { ICompany } from '../types/companyType';
// import { useAppDispatch } from '../redux/hooks';
// import { getCompanies } from '../redux/server-operations';

// import CompanyList from '../components/CompanyList';
// import IntervalField from '../components/IntervalField';
// import { socket } from '../socket';

// const WatchList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const isFirstRender = useRef<boolean>(true);
//   const [interval, setInterval] = useState<number>(5);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       socket.emit('start');
//       return;
//     }

//     const handleTicker = async (data: ICompany[]) => {
//       await dispatch(getCompanies(data));
//     };

//     socket.on('ticker', handleTicker);

//     // return () => {
//     //   socket.off('ticker', handleTicker);
//     // };
//   }, [dispatch]);

//   return (
//     <div className="w-full h-fit flex flex-col items-center gap-6 px-6 pt-6 pb-20 bg-slate-200">
//       <IntervalField
//         fetchingInterval={interval}
//         setInterval={setInterval}
//         socket={socket}
//       />
//       <CompanyList fetchingInterval={interval} type={'watchlist'} />
//     </div>
//   );
// };
// export default WatchList;
