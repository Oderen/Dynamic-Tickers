import { ThreeDots } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center mx-auto">
      <ThreeDots
        width={200}
        height={200}
        radius="9"
        color="#b97d0d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
