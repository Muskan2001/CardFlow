import React from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Footer from './components/Footer';
import BoardProvider from './context/BoardContext';
import './styles.css';

function App() {
  return (
    <BoardProvider>
      <Header />
      <Board />
      <Footer />
    </BoardProvider>
  );
}

export default App;
