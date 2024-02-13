import { NavLink } from 'react-router-dom';

const activeStyles = {
  backgroundColor: '#2557A7',
  borderWidth: '1px',
  borderColor: '#2557A7',
  borderStyle: 'solid',
};

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center w-full h-20 bg-slate-400">
      <nav className="flex gap-10">
        <NavLink
          to="/"
          className={
            'flex justify-center aitems-center w-fit py-2 px-2 text-[20px] text-white border-2 border-white rounded-xl  hover:bg-black hover:border-black transition-all'
          }
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          Main
        </NavLink>
        <NavLink
          to="/watchlist"
          className={
            'flex justify-center aitems-center w-fit py-2 px-2 text-[20px] text-white border-2 border-white rounded-xl  hover:bg-black hover:border-black transition-all'
          }
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          WatchList
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
