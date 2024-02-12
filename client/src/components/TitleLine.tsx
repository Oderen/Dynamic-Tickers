const TitleLine: React.FC = () => {
  return (
    <div className="flex items-center px-8 py-2 text-lg font-semibold bg-white border-b-2 border-b-black">
      <span className="ml-2 mr-[65px]">Ticker</span>
      <span className="mr-[55px]">Exchange</span>
      <span className="mr-[65px]">Price</span>
      <div className="flex flex-col items-center mr-[40px]">
        <span>Price</span>
        <span>Change</span>
      </div>
      <div className="flex flex-col items-center mr-[45px]">
        <span>Divided/</span>
        <span>Yield</span>
      </div>
      <span className="mr-[35px]">Last Traded</span>
      <span>Watchlist</span>
    </div>
  );
};

export default TitleLine;
