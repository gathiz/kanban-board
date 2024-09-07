import Sidebar from "../sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex w-full bg-gray-100">
            <Sidebar />
            <div className="flex w-full">
                {children}
            </div>
        </div>
    );
}

export default Layout;