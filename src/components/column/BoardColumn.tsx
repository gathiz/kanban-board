import { Column } from "../../types";
import TaskCard from "../task/TaskCard";

interface BoardColumnProps {
    column: Column
}

const BoardColumn: React.FC<BoardColumnProps> = ({ column }) => {

    const tasks = column.tasks;

    return (
        <div className="flex flex-col items-start w-full bg-gray-100 mx-2">
            <p className="text-base font-bold m-2">{column.name}</p>
            {tasks.map((task, index) => (
                <TaskCard
                    key={index}
                    task={{
                        title: task.title,
                        status: task.description,
                        description: task.description,
                        subtasks: task.subtasks
                    }} />
            ))}
        </div>
    );
}

export default BoardColumn;