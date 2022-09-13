import React, {useEffect, useState} from "react";
import axios from "axios";
import {StudentType} from "../../types";
import Navbar from "../layout/Navbar";
import {BASE_URL} from "../../properties";

const Student: React.FC<{}> = (props) => {
    const [users, setUsers] = useState<StudentType[]>();

    useEffect(() => {
        axios.get(BASE_URL + "/users/role/student")
            .then((res) => {
                setUsers(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, []);

    const searchByLastname = async (lastname: string) => {
        await axios.get(BASE_URL + "/users?lastname=" + lastname)
            .then((res: any) => {
                setUsers(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Navbar searchBar={true} search={searchByLastname} labelSearch={"Search by lastname"}/>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>

            <h2>Section title</h2>
            <div className="table-responsive">
                <table id={"table"} className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Ref</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Group</th>
                        <th scope="col">Entrance date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (users || []).map((user: any) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.ref}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.groups.name}</td>
                                    <td>{user.entranceDate}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Student;
