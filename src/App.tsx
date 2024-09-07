import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./components/home/Home"
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addBoards } from "./store/boardSlice";

const App = () => {

  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get('/data.json').then((response) => {
      const boardData = response.data;
      dispatch(addBoards(boardData));
    });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
