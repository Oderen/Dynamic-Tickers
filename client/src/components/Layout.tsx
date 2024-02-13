import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Loader from './Loader';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col w-screen min-h-full">
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
