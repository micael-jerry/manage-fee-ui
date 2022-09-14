import React, {useEffect, useState} from "react";
import axios from "axios";
import {StudentType} from "../../types";
import Navbar from "../layout/Navbar";
import {BASE_URL} from "../../properties";

const Student: React.FC<{
    toggleModal: (modal: string) => void,
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void
}> = (props) => {
    const {toggleModal, setModalValue, setRequest} = props;
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
        await axios.get(BASE_URL + "/users/role/student?lastname=" + lastname)
            .then((res: any) => {
                setUsers(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    const getModalValue = async (id: number | string) => {
        await axios.get(BASE_URL + "/users/" + id)
            .then((res: any) => {
                console.log(res)
                setModalValue(res.data);
            }).catch((err) => {
                console.log(err);
            })
        await toggleModal("studentModal");
    }

    return (
        <>
            <Navbar searchBar={true} search={searchByLastname} labelSearch={"Search by lastname"}/>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                            setRequest("add");
                            toggleModal("studentModal");
                        }}>ADD NEW STUDENT
                        </button>
                        <select name={"sortByLastName"} id={"sortByLastName"}
                                className="btn btn-sm btn-outline-secondary">
                            <option value={undefined} selected={true}>Sort by lastname</option>
                            <option value={"asc"}>asc</option>
                            <option value={"desc"}>desc</option>
                        </select>
                    </div>
                    <button disabled={true} type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>

            <h2>Student List</h2>
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
                        (users || []).map((user: StudentType) => {
                            return (
                                <tr key={user.id} >
                                    <td>{user.ref}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.groups == null ? "" : user.groups.name}</td>
                                    <td>{user.entranceDate}</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                                            getModalValue(user.id == null ? 0 : user.id);
                                            setRequest("update");
                                        }}>UPDATE</button>
                                    </td>
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
