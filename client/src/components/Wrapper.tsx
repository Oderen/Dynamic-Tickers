import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export default Wrapper;
