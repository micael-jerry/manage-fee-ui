import React from 'react';
import Home from "./components/pages/Home";
import Student from "./components/pages/Student";
import Navbar from "./components/layout/Navbar";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/student"} element={<Student/>}></Route>
            </Routes>
            <Navbar/>
        </>
    );
}

export default App;
