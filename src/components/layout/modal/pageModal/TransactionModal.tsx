import React, {useEffect, useState} from "react";
import './modal.css'
import {FeeType, TransactionType} from "../../../../types";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../../../properties";

const Transaction: React.FC<{
    modalValue: any,
    request: string | null,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {modalValue, request, credentials} = props;
    const [value, setValue] = useState<TransactionType>();
    const [fees, setFees] = useState<FeeType[]>();

    useEffect(() => {
        getAllFees();
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue({id: null, amount: 0, date: "", description: null, fee: null})
        }
    }, [modalValue]);

    const onSubmit = async () => {
        if (credentials) {
            if (request == "add") {
                await axios({
                    method: "post", url: BASE_URL + "/transaction",
                    data: value, auth: credentials
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            } else if (request == "update") {
                await axios({
                    method: "put",
                    url: BASE_URL + "/transaction/" + value!.id,
                    data: value,
                    auth: credentials
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    const getAllFees = async () => {
        if (credentials) {
            await axios({
                method: "get",
                url: BASE_URL + "/fees",
                auth: credentials
            }).then((res) => {
                setFees(res.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const inputChangeValue = async (event: any) => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "amount") {
            setValue((state: any) => {
                return {...state, "amount": value}
            });
        } else if (key === "fee") {
            setValue((state: any) => {
                return {
                    ...state, "fee": {
                        "id": value
                    }
                }
            })
        }
    }

    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"type"}>Amount</label>
                    <input type={"text"} name={"amount"} id={"amount"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.amount) : ""}/>
                </div>
            </form>
            <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
        </>
    )
}
export default Transaction;
