import { useState } from "react";
import { Column, Task } from "../../types";
import TaskCard from "../task/TaskCard";
import TaskbarModal from "../modals/Taskbar/TaskbarModal";

interface BoardColumnProps {
    column: Column;
    colIndex: number;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ column, colIndex }) => {

    const [task, setTask] = useState<Task>();
    const [isOpen, setIsOpen] = useState(false);

    const tasks = column.tasks;

    const handleClick = (t: Task) => {
        setTask(t);
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-start w-full bg-gray-100 mx-2">
            <p className="text-base font-bold m-2">{column.name}</p>
            {tasks.map((t, index) => (
                <TaskCard
                    key={index}
                    task={{
                        title: t.title,
                        status: t.status,
                        description: t.description,
                        subtasks: t.subtasks
                    }}
                    onClick={handleClick} />
            ))}
            <TaskbarModal
                task={task}
                isOpen={isOpen}
                onClose={handleClose}
                colIndex={colIndex}
            />
        </div>
    );
}

export default BoardColumn;