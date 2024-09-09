import { useState } from "react";
import NewTask from "../modals/task/NewTask";

interface NavbarProps {
    title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className="flex items-center justify-between bg-white border-1">
            <p className="rounded-lg text-xl bg-blue m-2 p-2 font-bold">{title}</p>
            <div onClick={handleClick} className="flex items-center justify-between bg-light-secondary p-4 m-4 h-12 rounded-lg text-white">
                <p>+Add New Task</p>
            </div>
            <NewTask isOpen={open} onClose={handleClose} />
        </div>
    );
}

export default Navbar;