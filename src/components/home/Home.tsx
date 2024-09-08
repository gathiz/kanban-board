import Navbar from "../navbar/Navbar";
import ColumnList from "../column/ColumnList";

const Home = () => {
    return(
        <div className="flex flex-col w-full h-full">
            <Navbar title="Select a board"/>
            <ColumnList/>
        </div>
    );
}

export default Home;