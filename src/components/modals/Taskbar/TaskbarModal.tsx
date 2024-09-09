import { Task } from "../../../types";
import Dropdown from "./Dropdown";
import TaskbarItem from "./TaskbarItem";

interface TaskbarModalProps {
    task?: Task;
    colIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const TaskbarModal: React.FC<TaskbarModalProps> = (props) => {

    if (!props.isOpen) return null;
    return (
        <div className="absolute w-screen max-w-[25vw] top-1/4 left-1/4 bg-gray-50 flex flex-col items-start justify-start m-4 p-4">
            <p className="font-bold my-2 mx-4">{props.task?.title}</p>
            <p className="font-bold mx-4 mt-8">{`Subtasks (${props.task?.subtasks.filter(s => s.isCompleted).length} of ${props.task?.subtasks.length})`}</p>

            {props.task?.subtasks.map((subtask, index) => (
                <TaskbarItem
                    key={index}
                    columnIndex={props.colIndex}
                    subtaskIndex={index}
                    title={props.task!.title}
                    subtitle={subtask.title}
                    isComplete={subtask.isCompleted} />
            ))}
            <p className="font-bold mx-4">Current Status</p>
            <Dropdown onChange={props.onClose} select={props.task?.status} columnIndex={props.colIndex} taskTitle={props?.task?.title} />
        </div>
    );
}

export default TaskbarModal;