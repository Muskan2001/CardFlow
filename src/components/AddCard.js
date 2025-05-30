import React, { useState, useContext } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { BoardContext } from '../context/BoardContext';
import { v4 as uuid } from 'uuid';
import AddIcon from '@mui/icons-material/Add';

const AddCard = ({ listId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const { lists, setLists } = useContext(BoardContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newCard = {
      id: uuid(),
      content: content.trim()
    };

    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, newCard]
        };
      }
      return list;
    });

    setLists(updatedLists);
    setContent('');
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter card content..."
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
            autoFocus
          />
          <Button
            variant="contained"
            type="submit"
            size="small"
            sx={{ mr: 1 }}
          >
            Add Card
          </Button>
          <Button
            size="small"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => setIsEditing(true)}
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          Add a card
        </Button>
      )}
    </>
  );
};

export default AddCard;
