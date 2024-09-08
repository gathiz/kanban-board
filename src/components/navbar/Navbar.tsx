
interface NavbarProps {
    title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
    return (
        <div className="flex items-center justify-between bg-white border-1">
            <p className="rounded-lg text-xl bg-blue m-2 p-2 font-bold">{title}</p>
            <div className="flex items-center justify-between bg-light-secondary p-4 m-4 h-12 rounded-lg text-white">
                <p>+Add New Task</p>
            </div>
        </div>
    );
}

export default Navbar;