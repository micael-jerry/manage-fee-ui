import React, {useEffect, useState} from "react";
import Navbar from "../layout/Navbar";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../properties";
import {TransactionType} from "../../types";

const Transaction: React.FC<{
    toggleModal: (modal: string) => void,
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {credentials} = props;
    const [transactions, setTransactions] = useState<TransactionType[] | null>(null);

    useEffect(() => {
        if (credentials) {
            axios({
                method: "get",
                url: BASE_URL + "/transaction",
                auth: credentials
            }).then((res: any): void => {
                setTransactions(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, []);

    return (
        <>
            <Navbar/>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <select name={"sortByLastName"} id={"sortByLastName"} disabled={true}
                                className="btn btn-sm btn-outline-secondary">
                            <option value={undefined} selected={true}>Sort by date descending</option>
                            <option value={"asc"}>asc</option>
                            <option value={"desc"}>desc</option>
                        </select>
                    </div>
                </div>
            </div>

            <h2>Transactions History Lists</h2>
            <div className="table-responsive">
                <table id={"table"} className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Fee type / total / school year</th>
                        <th scope="col">Date</th>
                        <th scope="col">Student Id</th>
                        <th scope="col">Student Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (transactions || []).map((transaction: TransactionType) => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.amount == null ? "" : transaction.amount}</td>
                                    <td>{
                                        transaction.fee == null ? "" : transaction.fee.type + " / " +
                                            transaction.fee.totalAmount + "Ar / " +
                                            transaction.fee.schoolYear?.startYear + "-" + transaction.fee.schoolYear?.endYear
                                    }</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.fee == null ? "" : transaction.fee.student?.id}</td>
                                    <td>{
                                        transaction.fee == null ? "" : (transaction.fee.student?.lastname + " " + transaction.fee.student?.firstname)
                                    }</td>
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

export default Transaction;
