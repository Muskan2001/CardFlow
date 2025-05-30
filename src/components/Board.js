import React, { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import List from "./List";
import AddList from "./AddList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Container, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Footer from "./Footer";

const Board = () => {
  const { lists, setLists, resetBoard } = useContext(BoardContext);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "LIST") {
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      setLists(newLists);
      return;
    }

    // Handle card drag
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceListIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const destListIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const newLists = [...lists];
    const sourceCards = [...lists[sourceListIndex].cards];
    const destCards =
      source.droppableId === destination.droppableId
        ? sourceCards
        : [...lists[destListIndex].cards];

    const [removed] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, removed);

    newLists[sourceListIndex].cards = sourceCards;
    if (source.droppableId !== destination.droppableId) {
      newLists[destListIndex].cards = destCards;
    }

    setLists(newLists);
  };

  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #2b5876 0%, #4e4376 100%)",
        py: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth={false} sx={{ flex: 1 }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AddList />
          <Button
            variant="contained"
            startIcon={<RestartAltIcon />}
            onClick={resetBoard}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.85)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              px: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            Reset Board
          </Button>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="LIST">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  pb: 2,
                  "&::-webkit-scrollbar": {
                    height: 8,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.15)",
                    borderRadius: 2,
                  },
                }}
              >
                {lists.map((list, index) => (
                  <List key={list.id} list={list} index={index} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
      <Footer />
    </Box>
  );
};

export default Board;
