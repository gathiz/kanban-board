import React, { useState } from "react";
import { addTask, selectActiveIndex, selectAllBoards } from "../../../store/boardSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../../types";

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewTask: React.FC<NewTaskModalProps> = ({ isOpen, onClose }) => {
    
    if (!isOpen) return null;

    const dispatch = useDispatch<AppDispatch>();
    const boards = useSelector((state: RootState) => selectAllBoards(state));
    const activeIndex = useSelector((state: RootState) => selectActiveIndex(state));
    const columns = boards[activeIndex || 0].columns;
    const options = columns.map((column) => column.name);

    const [data, setData] = useState({
        title: "",
        description: "",
        status: options[0],
        count: 0
    });

    const [subs, setSubs] = useState<string[]>([]);

    const handleClick = () => {
        const task: Task = {
            title: data.title,
            status: data.status,
            description: data.description,
            subtasks: subs.map((sub) => ({ title: sub, isCompleted: false })),
        };

        dispatch(addTask({ boardIndex: activeIndex, taskIndex: 0, newTask: task }));
        onClose();
    };

    const handleCancel = () => {
        onClose();
    }

    const handleSubtaskChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = [...subs];
        newValues[index] = e.target.value;
        setSubs(newValues);
    };

    const handleAddSubtask = () =>
        setData((prev) => ({ ...prev, count: prev.count + 1 }));

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));


    return (
        <div className="absolute w-screen max-w-[20vw] top-1/4 left-1/4 bg-gray-100 rounded-xl flex flex-col items-center border-2 border-gray-200 justify-between">
            <p className="font-bold mx-2 px-2 mt-4">Add New Task</p>
            <div className="flex flex-col w-11/12 items-start justify-between m-2 py-2">
                <label className="text-sm m-2 px-2">Title</label>
                <input
                    className="w-11/12 p-2 mx-4 rounded-lg border-2 border-gray-200"
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange} />
            </div>
            <div className="flex flex-col w-11/12 items-start justify-between m-2">
                <label className="text-sm m-2 px-2">Description</label>
                <textarea
                    className="w-11/12 p-2 mx-4 rounded-lg border-2 border-gray-200"
                    name="description"
                    value={data.description}
                    onChange={handleChange} />
                <p className="font-bold text-sm px-4 mt-4">Subtasks</p>
                {Array.from({ length: data.count }, (_, index) => (
                    <input
                        className="w-11/12 p-2 mx-4 my-2 rounded-lg border-2 border-gray-200"
                        key={index}
                        type="text"
                        value={subs[index] || ""}
                        onChange={(e) => handleSubtaskChange(index, e)} />
                ))}
                <button
                    onClick={handleAddSubtask}
                    className="w-11/12 m-4 p-2 rounded-lg bg-gray-300">
                    +Add New Subtask
                </button>
                <select
                    name="status"
                    onChange={handleChange}
                    value={data.status}
                    className="w-11/12 bg-gray-100 text-black p-2 m-4 my-2 border-2 border-gray-200">
                    {options.map((o, index) => (
                        <option key={index}>{o}</option>
                    ))}
                </select>

                <button
                    onClick={handleClick}
                    className="w-11/12 mx-4 mt-4 p-2 mt-2 mb-8 rounded-lg bg-gray-300">
                    Create Task
                </button>
                <button
                    onClick={handleCancel}
                    className="w-11/12 mx-4 p-2 mb-8 rounded-lg bg-gray-300">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default NewTask;