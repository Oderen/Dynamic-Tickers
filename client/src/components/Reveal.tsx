import React, { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  item: any;
}

const Reveal: React.FC<Props> = ({ children, item }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
      }}
    >
      <motion.div
        key={item}
        variants={{
          hidden: { opacity: 0, y: -15 },
          show: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={'show'}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
