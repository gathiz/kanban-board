import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { selectAllBoards, setActiveBoard } from "../../store/boardSlice";
import { Board } from "../../types";
import SidebarItem from "./SidebarItem";
import { useState } from "react";

interface SidebarListProps {
    onCreateClick: () => void;
}

const SidebarList: React.FC<SidebarListProps> = ({onCreateClick}) => {

    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();


    const boards: Board[] = useSelector((state: RootState) => selectAllBoards(state));

    const [active, setActive] = useState(-1);

    const handleClick = (id: string) => {
        const index = parseInt(id);
        setActive(index);
        dispatch(setActiveBoard({boardIndex: index}));
    }

    const handleCreateClick = () => {
        onCreateClick();
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
            <hr />
            <SidebarItem
                id="4"
                icon="src/assets/icon-board.svg"
                title="+Create New Board"
                active={false}
                onClick={handleCreateClick}
            />
        </div>
    );
}

export default SidebarList;