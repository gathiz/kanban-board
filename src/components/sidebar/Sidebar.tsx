import { useState } from "react";
import logoDark from "../../assets/logo-dark.svg";
import NewBoard from "../modals/board/NewBoard";
import SidebarList from "./SidebarList";

const Sidebar = () => {

    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

    const handleCreateClick = () => {
        setIsAddBoardOpen(true);
    }

    const handleClose = () => {
        setIsAddBoardOpen(false);
    }

    return (
        <div className="flex flex-col items-start py-4 w-72 bg-white h-screen border-2">
            <img className="m-2 p-2" src={logoDark} />
            <SidebarList onCreateClick={handleCreateClick} />
            <NewBoard isOpen={isAddBoardOpen} onClose={handleClose}/>
        </div>
    );
}

export default Sidebar;