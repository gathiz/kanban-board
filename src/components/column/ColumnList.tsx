import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectActiveIndex, selectAllBoards } from "../../store/boardSlice";
import { Board } from "../../types";
import BoardColumn from "./BoardColumn";

const ColumnList = () => {

    const boards: Board[] = useSelector((state: RootState) => selectAllBoards(state));

    const activeIndex = useSelector((state: RootState) => selectActiveIndex(state));

    const columns = boards[activeIndex || 0]?.columns;

    return(
        <div className="flex items-start w-1/2 justify-between bg-gray-100 mx-4 px-8">
           {columns && columns.map((column, index) => (
            <BoardColumn key={index} column={column} colIndex={index}/>
           ))}
        </div>
    );
}

export default ColumnList;