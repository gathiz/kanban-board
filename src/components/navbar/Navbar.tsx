
interface NavbarProps {
    title: string;
}

const Navbar: React.FC<NavbarProps> = ({title}) => {
    return(
        <div className="flex items-center justify-between">
            <p className="rounded-lg bg-blue m-4 p-4">{title}</p>
            <button>+Add New Task</button>
        </div>
    );
}

export default Navbar;