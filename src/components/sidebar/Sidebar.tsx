import logoDark from "../../assets/logo-dark.svg";
import BoardList from "./BoardList";

const Sidebar = () => {

    return (
        <div className="flex flex-col items-start py-4 w-80 bg-white h-screen border-2">
            <img className="m-2 p-2" src={logoDark} />
            <BoardList />
        </div>
    );
}

export default Sidebar;