import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const CardItem = ({ card, listIndex, cardIndex }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={card.id} index={cardIndex}>
        {(provided) => (
          <div
            className="card-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setOpen(true)}
          >
            {card.title}
          </div>
        )}
      </Draggable>
      {open && (
        <CardModal
          card={card}
          listIndex={listIndex}
          cardIndex={cardIndex}
          closeModal={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default CardItem;
