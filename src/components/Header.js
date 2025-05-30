import React, { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';

const Header = () => {
  const { resetBoard } = useContext(BoardContext);

  return (
    <header className="header">
      <h1>CardFlow</h1>
      {/* <button onClick={resetBoard}>Reset Board</button> */}
    </header>
  );
};

export default Header;
