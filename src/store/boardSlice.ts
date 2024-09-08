import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./index.ts";
import { Board, Task } from '../types/index.ts';

const initialState: BoardState = {
    boards: []
};

interface BoardState {
    boards: Board[],
    active?: number
}

export const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoards: (state, action: PayloadAction<Board[]>) => {
            const boards = action.payload;
            boards.forEach((board: Board) => {
                state.boards.push(board)
            });
        },
        setActiveBoard: (state, action: PayloadAction<{boardIndex: number}>) => {
            const boardIndex = action.payload.boardIndex;
            state.active = boardIndex;
        },
        addBoard: (state, action: PayloadAction<{ newBoard: Board, boardIndex: number }>) => {
            const { newBoard, boardIndex } = action.payload;
            if (boardIndex < 0) {
                state.boards.push(newBoard);
            } else {
                state.boards.splice(boardIndex, 0, newBoard);
            }
        },
        editBoard: (state, action: PayloadAction<{ newBoard: Board, boardName: string }>) => {
            const { boardName, newBoard } = action.payload;
            deleteBoard({ boardName });
            const boardIndex = state.boards.findIndex(board => board.name === boardName);
            addBoard({ newBoard, boardIndex });
        },
        addColumn: (state, action: PayloadAction<{ boardIndex: number, columnName: string }>) => {
            const { boardIndex, columnName } = action.payload;
            state.boards[boardIndex].columns.push({ name: columnName, tasks: [] });
        },
        addTask: (state, action: PayloadAction<{ boardIndex: number, newTask: Task, taskIndex: number }>) => {
            const { boardIndex, newTask, taskIndex } = action.payload;
            let columns = state.boards[boardIndex].columns;
            let colIndex = columns.findIndex(column => column.name === newTask.status);
            if (taskIndex >= 0) {
                state.boards[boardIndex].columns[colIndex].tasks.splice(taskIndex, 0, newTask);
            } else {
                state.boards[boardIndex].columns[colIndex].tasks.push(newTask);
            }
        },
        editTask: (_state, action: PayloadAction<{ boardIndex: number, columnIndex: number, taskIndex: number, editedTask: Task, statusUnchanged: boolean }>) => {
            const { boardIndex, editedTask, taskIndex } = action.payload;
            const newTask = editedTask;
            deleteTask(action.payload);
            addTask({ boardIndex, newTask, taskIndex });
        },
        deleteTask: (state, action: PayloadAction<{ boardIndex: number, columnIndex: number, taskIndex: number }>) => {
            const { boardIndex, columnIndex, taskIndex } = action.payload;
            state.boards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
        },
        deleteBoard: (state, action: PayloadAction<{ boardName: string }>) => {
            let index = state.boards.findIndex(board => board.name === action.payload.boardName);
            state.boards.splice(index, 1);
        },
        updateSubtask: (state, action: PayloadAction<{ boardIndex: number, columnIndex: number, taskIndex: number, subtaskIndex: number }>) => {
            const { boardIndex, columnIndex, taskIndex, subtaskIndex } = action.payload;
            const currentSubtask = state.boards[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex];
            currentSubtask.isCompleted = !currentSubtask.isCompleted;
        },
        updateTaskStatus: (state, action: PayloadAction<{ boardIndex: number, columnIndex: number, taskIndex: number, newStatus: string }>) => {
            const { boardIndex, columnIndex, taskIndex, newStatus } = action.payload;
            let taskToUpdate = state.boards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
            taskToUpdate[0].status = newStatus;
            const columns = state.boards[boardIndex].columns;
            const newColumnIndex = columns.findIndex(column => column.name === newStatus);
            state.boards[boardIndex].columns[newColumnIndex].tasks.push(taskToUpdate[0]);
        }
    },
});

export const {
    addBoards,
    addBoard,
    deleteTask,
    deleteBoard,
    addColumn,
    addTask,
    updateSubtask,
    updateTaskStatus,
    editTask,
    editBoard,
    setActiveBoard
} = boardSlice.actions;

export default boardSlice.reducer;

export const selectBoards = (state: RootState) => state.board.boards;

export const selectActive = (state: RootState) => state.board.active;

export const selectAllBoards = createSelector([selectBoards], (boards) => boards);



