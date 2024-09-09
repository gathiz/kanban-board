import { Task } from "../../types";

interface TaskCardProps {
    task: Task;
    onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({task, onClick}) => {

    const handleClick = () => {
        onClick(task);
    }

    const completed = task.subtasks.filter((subtask) => subtask.isCompleted).length;

    return(
        <div onClick={handleClick} className="flex flex-col w-full items-start justify-center h-20 rounded-xl h-full shadow-2xl my-4 py-1 bg-white">
            <p className="text-base font-bold my-2 mx-4">{task.title}</p>
            <p className="text-sm my-2 mx-4">{`${completed} of ${task.subtasks.length} subtasks`}</p>
        </div>
    );
}

export default TaskCard;