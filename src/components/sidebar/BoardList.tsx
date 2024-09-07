import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectAllBoards } from "../../store/boardSlice";
import { Board } from "../../types";
import SidebarItem from "./SidebarItem";
import { useState } from "react";

const BoardList = () => {
    const boards: Board[] = useSelector((state: RootState) => selectAllBoards(state));

    const [active, setActive] = useState(-1);

    const handleClick = (id: string) => {
        setActive(parseInt(id));
    }

    return (
        <div className="flex flex-col w-full mt-4">
            <h1 className="text-sm uppercase m-4">All Boards ({boards.length})</h1>
            {boards.map((board, index) => (
                <SidebarItem
                    id={index.toString()}
                    key={index.toString()}
                    icon="src/assets/icon-board.svg"
                    title={board.name}
                    onClick={handleClick}
                    active={index === active ? true : false} />
            ))}

            <div>
                <p className="text-sm my-4">+ Create New Board</p>
            </div>
        </div>
    );
}

export default BoardList;