import React, { createContext, useState, useEffect } from 'react';
import { loadBoard, saveBoard } from '../utils/storage';
import { v4 as uuid } from 'uuid';

export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [lists, setLists] = useState(loadBoard() || []);

  useEffect(() => {
    saveBoard(lists);
  }, [lists]);

  const resetBoard = () => setLists([]);

  const updateCard = (listId, cardId, cardData) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(card => 
            card.id === cardId 
              ? { ...card, ...cardData }
              : card
          )
        };
      }
      return list;
    }));
  };

  const addList = (title) => {
    const newList = {
      id: uuid(),
      title,
      cards: []
    };
    setLists([...lists, newList]);
  };

  const deleteCard = (listId, cardId) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      return list;
    }));
  };

  const deleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  return (
    <BoardContext.Provider value={{ 
      lists, 
      setLists, 
      resetBoard, 
      updateCard,
      addList,
      deleteCard,
      deleteList
    }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
