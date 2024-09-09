import { useDispatch, useSelector } from "react-redux";
import { Board } from "../../../types";
import { selectActiveIndex, selectAllBoards, updateTaskStatus } from "../../../store/boardSlice";
import { AppDispatch, RootState } from "../../../store";
import { useState } from "react";

interface DropdownProps {
    select?: string;
    taskTitle?: string;
    columnIndex: number;
    onChange: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ select, taskTitle, columnIndex, onChange }) => {

    const [selected, setSelected] = useState(select);

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    const boards: Board[] = useSelector((state: RootState) => selectAllBoards(state));

    const activeIndex = useSelector((state: RootState) => selectActiveIndex(state)) || 0;

    const board = boards[activeIndex || 0];
    
    const options = board.columns.map((col) => col.name);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const value = e.target.value;
        
        setSelected(value);
        
        const titles = board.columns[0].tasks.map((task) => task.title);
        const taskIndex = titles.indexOf(taskTitle!);

        console.log(activeIndex, columnIndex, taskIndex);

        dispatch(updateTaskStatus({
            boardIndex: activeIndex, 
            columnIndex: columnIndex,
            taskIndex: taskIndex,
            newStatus: value
        }));

        onChange();
    }

    return (
        <select onChange={handleChange} value={selected} className="w-11/12 bg-gray-100 text-black p-4 m-4">
            {options.map((o, index) => (
                <option key={index}>{o}</option>
            ))}
        </select>
    );
}

export default Dropdown;