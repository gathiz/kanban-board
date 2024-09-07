
interface SidebarItemProps {
    id: string;
    icon: string;
    title: string;
    active: boolean;
    onClick: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({id, icon, title, active, onClick}) => {

    const handleClick = () => {
        onClick(id);
    }

    return(
        <div onClick={handleClick} id={id} className={`flex w-full my-2 py-2 ${active ? "bg-light-secondary text-white rounded-lg ": " bg-transparent"}`}>
            <img className="mx-4" src={icon}/>
            <p className="text-base mx-2">{title}</p>
        </div>
    );
}

export default SidebarItem;