import React, {useEffect, useState} from "react";
import './modal.css'
import {FeeType, SchoolYearType, StudentType, TransactionType} from "../../../../types";
import axios from "axios";
import {BASE_URL} from "../../../../properties";

const Transaction: React.FC<{
    modalValue: any,
    request: string | null
}> = (props) => {
    const {modalValue, request} = props;
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
        if (request == "add") {
            await axios.post(
                BASE_URL + "/transaction", value
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        } else if (request == "update") {
            await axios.put(
                BASE_URL + "/transaction/" + value!.id,
                value
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const getAllFees = async () => {
        await axios.get(BASE_URL + "/fees").then((res) => {
            setFees(res.data);
        }).catch((err) => {
            console.log(err)
        })
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
