import React, {useEffect, useState} from "react";
import axios, {AxiosBasicCredentials} from "axios";
import {StudentType} from "../../types";
import Navbar from "../layout/Navbar";
import {BASE_URL} from "../../properties";

const Student: React.FC<{
    toggleModal: (modal: string) => void,
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {toggleModal, setModalValue, setRequest, credentials} = props;
    const [users, setUsers] = useState<StudentType[]>();

    useEffect(() => {
        if (credentials) {
            axios({
                method: "get",
                url: BASE_URL + "/users/role/student",
                auth: credentials
            })
                .then((res) => {
                    setUsers(res.data)
                }).catch((err) => {
                console.log(err)
            })
        }
    }, []);

    const searchByLastname = async (lastname: string) => {
        if (credentials) {
            await axios({
                method: "get",
                url: BASE_URL + "/users/role/student?lastname=" + lastname,
                auth: credentials
            }).then((res: any) => {
                setUsers(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const getModalValue = async (id: number | string) => {
        if (credentials) {
            await axios({
                method: "get",
                url: BASE_URL + "/users/" + id,
                auth: credentials
            }).then((res: any) => {
                setModalValue(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
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
                        <button type="button" className="btn btn-secondary" onClick={() => {
                            setRequest("add");
                            toggleModal("studentModal");
                        }}>ADD NEW STUDENT
                        </button>
                    </div>
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
                                <tr key={user.id}>
                                    <td>{user.ref}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.groups == null ? "" : user.groups.name}</td>
                                    <td>{user.entranceDate}</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => {
                                                    getModalValue(user.id == null ? 0 : user.id);
                                                    setRequest("update");
                                                }}>SHOW/UPDATE
                                        </button>
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
