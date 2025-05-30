import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { 
  Paper, Typography, Box, TextField, IconButton,
  Stack, Divider, TextField as MuiTextField 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const Card = ({ card, index, updateCard, deleteCard, listId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(card.content);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || null);

  const handleSave = () => {
    if (editedContent.trim()) {
      updateCard(card.id, {
        content: editedContent.trim(),
        description: description.trim(),
        dueDate
      });
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            p: 2,
            mb: 1,
            backgroundColor: 'white',
            '&:hover .card-actions': {
              opacity: 1,
            },
            opacity: snapshot.isDragging ? 0.9 : 1,
          }}
        >
          {isEditing ? (
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Title"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                autoFocus
                size="small"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={setDueDate}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton size="small" onClick={handleSave} color="primary">
                  <CheckIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => setIsEditing(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          ) : (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">{card.content}</Typography>
                <Box className="card-actions" sx={{ opacity: 0, transition: 'opacity 0.2s' }}>
                  <IconButton size="small" onClick={() => setIsEditing(true)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteCard(listId, card.id)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {card.description && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </>
              )}
              {card.dueDate && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DateRangeIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(card.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      )}
    </Draggable>
  );
};

export default Card;
