import React, { useContext } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BoardContext } from '../context/BoardContext';
import Card from './Card';
import AddCard from './AddCard';
import { Paper, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const List = ({ list, index }) => {
  const { updateCard, deleteCard, deleteList } = useContext(BoardContext);

  const handleUpdateCard = (cardId, newContent) => {
    updateCard(list.id, cardId, newContent);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          sx={{
            width: 300,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box {...provided.dragHandleProps}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  pb: 2,
                  mb: 2,
                  borderBottom: 1,
                  borderColor: 'grey.200',
                  fontWeight: 600
                }}
              >
                {list.title}
              </Typography>
              <IconButton 
                size="small" 
                onClick={() => deleteList(list.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Droppable droppableId={list.id} type="CARD">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ flexGrow: 1, minHeight: '100px' }}
              >
                {list.cards.map((card, index) => (
                  <Card 
                    key={card.id} 
                    card={card} 
                    index={index}
                    listId={list.id}
                    updateCard={handleUpdateCard}
                    deleteCard={deleteCard}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Box sx={{ mt: 2 }}>
            <AddCard listId={list.id} />
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};

export default List;
