const STORAGE_KEY = 'trello_board';

export const loadBoard = () => {
  try {
    const board = localStorage.getItem(STORAGE_KEY);
    return board ? JSON.parse(board) : [];
  } catch (error) {
    console.error('Error loading board:', error);
    return [];
  }
};

export const saveBoard = (board) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch (error) {
    console.error('Error saving board:', error);
  }
};
