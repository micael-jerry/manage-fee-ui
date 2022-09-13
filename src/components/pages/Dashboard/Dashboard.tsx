import React from "react";
import './dashboard.css'
import Navbar from "../../layout/Navbar";
import Content from "./Content";
import {Route, Routes} from "react-router-dom";
import Student from "../Student";
import Home from "../Home";
import NotFound from "../NotFound";
import SideBar from "../../layout/SideBar";

const Dashboard: React.FC<{}> = (props) => {

    return (
        <div className="container-fluid">
            <Navbar/>
            <div className="row">
                <SideBar/>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path={"/"} element={<Home/>}></Route>
                        <Route path={"/fee"} element={<Content/>}></Route>
                        <Route path={"/student"} element={<Student/>}></Route>
                        <Route path={"*"} element={<NotFound/>}></Route>
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
