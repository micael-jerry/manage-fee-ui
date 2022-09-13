import React, {useEffect, useState} from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import {BASE_URL} from "../../properties";
import {FeeType} from "../../types";

const Fee: React.FC<{}> = (props) => {
    const [fees, setFees] = useState<FeeType[] | null>(null);

    useEffect(() => {
        axios.get(BASE_URL + "/fees")
            .then((res: any): void => {
                setFees(res.data);
                console.log(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <>
            <Navbar/>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">ADD NEW STUDENT</button>
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

            <h2>Fees List</h2>
            <div className="table-responsive">
                <table id={"table"} className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Student Id</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Type</th>
                        <th scope="col">Remaining</th>
                        <th scope="col">Total</th>
                        <th scope="col">School Year</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (fees || []).map((fee: FeeType) => {
                            return (
                                <tr key={fee.id}>
                                    <td>{fee.student.id}</td>
                                    <td>{fee.student.lastname}</td>
                                    <td>{fee.type}</td>
                                    <td>{fee.remainingAmount}</td>
                                    <td>{fee.totalAmount}</td>
                                    <td>{fee.schoolYear.startYear + "-" + fee.schoolYear.endYear}</td>
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

export default Fee;
