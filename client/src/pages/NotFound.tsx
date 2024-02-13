const NotFound: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-[30px] text-red">
        Uups, there is no website with this address {':('}
      </h1>
    </div>
  );
};

export default NotFound;
