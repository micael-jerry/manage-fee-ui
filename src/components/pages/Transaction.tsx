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
    const {toggleModal, setModalValue, setRequest, credentials} = props;
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

    const getModalValue = async (id: number | string) => {
        if (credentials) {
            await axios({
                method: "get",
                url: BASE_URL + "/transaction/" + id,
                auth: credentials
            }).then((res: any) => {
                setModalValue(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        await toggleModal("transactionModal");
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
                            toggleModal("transactionModal");
                        }}>ADD NEW TRANSACTION
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

            <h2>Transactions List</h2>
            <div className="table-responsive">
                <table id={"table"} className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Date</th>
                        <th scope="col">Lastname</th>
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
                                    <td>{transaction.fee == null ? "" : transaction.fee.student?.lastname}</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => {
                                                    getModalValue(transaction.id == null ? 0 : transaction.id);
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

export default Transaction;
