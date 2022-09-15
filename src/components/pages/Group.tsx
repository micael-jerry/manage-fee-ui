import React, {useEffect, useState} from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import {BASE_URL} from "../../properties";
import {GroupType} from "../../types";

const Group: React.FC<{
    toggleModal: (modal: string) => void,
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void
}> = (props) => {
    const {toggleModal, setModalValue, setRequest} = props;
    const [groups, setGroups] = useState<GroupType[]>();

    useEffect(() => {
        axios.get(BASE_URL + "/group")
            .then((res: any): void => {
                setGroups(res.data);
                console.log(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, []);

    const getModalValue = async (id: number | string) => {
        await axios.get(BASE_URL + "/group/" + id)
            .then((res: any) => {
                setModalValue(res.data);
            }).catch((err) => {
                console.log(err);
            })
        await toggleModal("groupModal");
    }

    return (
        <>
            <Navbar/>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                            setRequest("add");
                            toggleModal("groupModal");
                        }}>ADD NEW GROUP
                        </button>
                    </div>
                    <button disabled={true} type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>

            <h2>Others List</h2>
            <div className="table-responsive">
                <table id={"table"} className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (groups || []).map((group: GroupType) => {
                            return (
                                <tr key={group.id}>
                                    <td>{group.name}</td>
                                    <td>{group.description == null ? "" : group.description}</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => {
                                                    getModalValue(group.id == null ? 0 : group.id);
                                                    setRequest("update");
                                                }}>UPDATE
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

export default Group;
