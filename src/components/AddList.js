import React, { useState, useContext } from 'react';
import { Paper, Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoardContext } from '../context/BoardContext';

const AddList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const { addList } = useContext(BoardContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addList(title.trim());
    setTitle('');
    setIsEditing(false);
  };

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {isEditing ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title..."
            variant="outlined"
            size="small"
            sx={{ mb: 1, bgcolor: 'white', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ mr: 1 }}
          >
            Add List
          </Button>
          <Button onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => setIsEditing(true)}
          sx={{ color: 'white' }}
        >
          Add another list
        </Button>
      )}
    </Paper>
  );
};

export default AddList;
