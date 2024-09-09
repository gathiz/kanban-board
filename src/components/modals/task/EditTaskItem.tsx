import { useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveIndex, selectAllBoards, updateSubtask } from "../../../store/boardSlice";
import { Board } from "../../../types";

interface TaskbarItemProps {
    title: string;
    subtitle: string;
    isComplete: boolean;
    subtaskIndex: number;
    columnIndex: number;
}

const EditTaskItem: React.FC<TaskbarItemProps> = ({ title, subtitle, isComplete, subtaskIndex, columnIndex }) => {

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    const boards: Board[] = useSelector((state: RootState) => selectAllBoards(state));

    const activeIndex = useSelector((state: RootState) => selectActiveIndex(state));

    const columns = boards[activeIndex || 0]?.columns;
    const titles = columns[columnIndex].tasks.map((task) => task.title);

    const taskIndex = titles.indexOf(title);

    const [isChecked, setIsChecked] = useState(isComplete);

    const handleChange = () => {
        setIsChecked(!isChecked);
        
        dispatch(updateSubtask({
            boardIndex: activeIndex!,
            columnIndex: columnIndex,
            taskIndex: taskIndex,
            subtaskIndex: subtaskIndex
        }));
    }

    return (
        <div className="flex w-11/12 items-center m-2 bg-gray-100 py-2">
            <input
                className="px-2 m-2"
                type="checkbox"
                checked={isChecked}
                onChange={handleChange} />
            <label className="mx-2">{subtitle}</label>
        </div>
    );
}

export default EditTaskItem;