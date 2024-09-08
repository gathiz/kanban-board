import logoDark from "../../assets/logo-dark.svg";
import SidebarList from "./SidebarList";

const Sidebar = () => {

    return (
        <div className="flex flex-col items-start py-4 w-72 bg-white h-screen border-2">
            <img className="m-2 p-2" src={logoDark} />
            <SidebarList />
        </div>
    );
}

export default Sidebar;