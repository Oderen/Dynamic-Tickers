import React, { useState } from 'react';
import { Socket } from 'socket.io-client';

interface Props {
  fetchingInterval: number;
  setInterval: (interval: number) => void;
  socket: Socket;
}

const IntervalField: React.FC<Props> = ({
  fetchingInterval,
  setInterval,
  socket,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [warning, setWarning] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === '') {
      setIsValid(false);
      setWarning('Interval cannot be empty');
      return;
    }
    if (inputValue === fetchingInterval.toString()) {
      setIsValid(false);
      setWarning('This interval is already set');
      return;
    }

    const regex = /^[1-9]\d*(\.\d+)?$/;
    const isValid: boolean = regex.test(inputValue);

    if (isValid) {
      const intevalInMs: number = Number(inputValue) * 1000;
      socket.emit('changeInterval', { interval: intevalInMs });
      setIsValid(true);
      setInputValue('');
      setInterval(Number(inputValue));
      return;
    } else {
      setIsValid(false);
      setWarning('Interval must be set in seconds');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="relative flex items-center mb-3">
        <label htmlFor="interval" className="flex flex-col gap-1 font-medium">
          Fetching Interval
          <input
            className="mr-2 rounded-xl py-2 px-2 outline-none font-normal"
            style={{
              borderColor: isValid ? '' : '#EF4444',
              borderWidth: 3,
              borderStyle: 'solid',
            }}
            type="text"
            id="interval"
            placeholder={'Set interval in seconds'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </label>
        {!isValid && (
          <span className="absolute top-[74px] left-0 text-red font-medium">
            {warning}
          </span>
        )}
        <button
          type="submit"
          className="w-15 h-10 mb-[-25px] rounded-xl py-2 px-2 outline-none cursor-pointer font-medium border border-black hover:bg-white transition-all hover:border-transparent"
        >
          Apply Interval
        </button>
      </form>
    </div>
  );
};

export default IntervalField;
