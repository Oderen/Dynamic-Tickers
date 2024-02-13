import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Loader from './Loader';

const HomePage = lazy(() => import('../pages/Home'));
const WatchList = lazy(() => import('../pages/WatchList'));
const NotFound = lazy(() => import('../pages/NotFound'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="watchlist" element={<WatchList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
