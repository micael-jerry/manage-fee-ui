import React from "react";
import './dashboard.css'
import Navbar from "../layout/Navbar";
import Content from "./Content";
import {Route, Routes} from "react-router-dom";
import Student from "../pages/Student";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SideBar from "../layout/SideBar";
import Fee from "../pages/Fee";
import Transaction from "../pages/Transaction";

const Dashboard: React.FC<{}> = (props) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <SideBar/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path={"/"} element={<Home/>}></Route>
                        <Route path={"/fees"} element={<Fee/>}></Route>
                        <Route path={"/students"} element={<Student/>}></Route>
                        <Route path={"/transaction"} element={<Transaction/>}></Route>
                        <Route path={"/content"} element={<Content/>}></Route>
                        <Route path={"*"} element={<NotFound/>}></Route>
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
