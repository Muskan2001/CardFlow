import React, { useState, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';

const CardModal = ({ card, listIndex, cardIndex, closeModal }) => {
  const { lists, setLists } = useContext(BoardContext);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [dueDate, setDueDate] = useState(card.dueDate);

  const handleSave = () => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards[cardIndex] = {
      ...card,
      title,
      description,
      dueDate
    };
    setLists(updatedLists);
    closeModal();
  };

  const handleDelete = () => {
    const updatedLists = [...lists];
    updatedLists[listIndex].cards.splice(cardIndex, 1);
    setLists(updatedLists);
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Card</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
