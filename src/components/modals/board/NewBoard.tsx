import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addBoard, selectAllBoards } from "../../../store/boardSlice";
import { Board } from "../../../types";

interface NewBoardProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewBoard: React.FC<NewBoardProps> = ({ isOpen, onClose }) => {

    const dispatch = useDispatch<AppDispatch>();
    const boards = useSelector((state: RootState) => selectAllBoards(state));
    

    const [boardName, setBoardName] = useState("");
    const [count, setCount] = useState(0);

    const [cols, setCols] = useState<string[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardName(e.target.value);
    }

    const handleClick = () => {
        const board: Board = {
            name: boardName, 
            columns: cols.map((col) => ({name: col, tasks: []}))
        }
        dispatch(addBoard({newBoard: board, boardIndex: boards.length}));
        onClose();
    }

    const handleCancel = () => {
        onClose();
    }

    const handleAddColumn = () => {
        setCount((prevCount) => prevCount + 1);
    }

    const handleColumnChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = [...cols];
        newValues[index] = e.target.value;
        setCols(newValues);
    };

    if (!isOpen) return null;

    return (
        <div className="absolute w-screen max-w-[20vw] top-1/4 left-1/4 bg-gray-100 rounded-xl flex flex-col items-center border-2 border-gray-200 justify-between">
            <p className="font-bold mx-2 px-2 mt-4">Add New Board</p>
            <div className="flex flex-col w-11/12 items-start justify-between m-2 py-2">
                <label className="text-sm m-2 px-2">Board Name</label>
                <input
                    className="w-11/12 p-2 mx-4 rounded-lg border-2 border-gray-200"
                    type="text"
                    name="boardname"
                    value={boardName}
                    onChange={handleChange} />
                <p className="text-sm px-4 mt-4">Columns</p>
                {Array.from({ length: count }, (_, index) => (
                    <input
                        className="w-11/12 p-2 mx-4 my-2 rounded-lg border-2 border-gray-200"
                        key={index}
                        type="text"
                        value={cols[index] || ""}
                        onChange={(e) => handleColumnChange(index, e)} />
                ))}
                <button
                    onClick={handleAddColumn}
                    className="w-11/12 m-4 p-2 rounded-lg bg-gray-300">
                    +Add New Column
                </button>
                <button
                    onClick={handleClick}
                    className="w-11/12 mx-4 mt-4 p-2 mb-8 rounded-lg bg-gray-300">
                    Create Board
                </button>
                <button
                    onClick={handleCancel}
                    className="w-11/12 mx-4 p-2 mb-8 rounded-lg bg-gray-300">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default NewBoard;