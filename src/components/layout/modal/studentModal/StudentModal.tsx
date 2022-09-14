import React, {useEffect, useState} from "react";
import './modal.css'
import {StudentType} from "../../../../types";
import axios from "axios";
import {BASE_URL} from "../../../../properties";

const StudentModal: React.FC<{
    modalValue: any,
    request: string | null
}> = (props) => {
    const {modalValue, request} = props;
    const [value, setValue] = useState<StudentType>();

    useEffect(() => {
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue(
                {
                    entranceDate: "",
                    groups: null, id: null,
                    password: null,
                    ref: "",
                    username: null,
                    lastname: "",
                    firstname: "",
                    sex: "",
                    birthDate: "",
                    address: "",
                    phone: "",
                    email: "",
                    role: "student"
                }
            )
        }
    }, [modalValue]);

    const onSubmit = async () => {
        if (request == "add") {
            let data = [];
            data.push(value);
            await axios.post(
                BASE_URL + "/users", data
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        } else if (request == "update") {
            await axios.put(
                BASE_URL + "/users/" + value!.id,
                value
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const inputChangeValue = (event: any): void => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "lastname") {
            setValue((state: any) => {
                return {
                    ...state,
                    "lastname": value
                }
            });
        }
        if (key === "firstname") {
            setValue((state: any) => {
                return {
                    ...state,
                    "firstname": value
                }
            });
        }
        if (key === "sex") {
            setValue((state: any) => {
                return {
                    ...state,
                    "sex": value
                }
            });
        }
        if (key === "birthDate") {
            setValue((state: any) => {
                return {
                    ...state,
                    "birthDate": value
                }
            });
        }
        if (key === "address") {
            setValue((state: any) => {
                return {
                    ...state,
                    "address": value
                }
            });
        }
        if (key === "phone") {
            setValue((state: any) => {
                return {
                    ...state,
                    "phone": value
                }
            });
        }
        if (key === "email") {
            setValue((state: any) => {
                return {
                    ...state,
                    "email": value
                }
            });
        }
    }

    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"lastname"}>lastname</label>
                    <input type={"text"} name={"lastname"} id={"lastname"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.lastname) : ""}/>
                    <label htmlFor={"firstname"}>firstname</label>
                    <input type={"text"} name={"firstname"} id={"firstname"}
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.firstname == null ? "" : value.firstname) : ""}/>
                    <label htmlFor={"sex"}>sex</label>
                    <input type={"text"} name={"sex"} id={"sex"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.sex) : ""}/>
                    <label htmlFor={"birthDate"}>birthDate</label>
                    <input type={"text"} name={"birthDate"} id={"birthDate"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.birthDate) : ""}/>
                    <label htmlFor={"address"}>address</label>
                    <input type={"text"} name={"address"} id={"address"}
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.address == null ? "" : value.address) : ""}/>
                    <label htmlFor={"phone"}>phone</label>
                    <input type={"text"} name={"phone"} id={"phone"}
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.phone == null ? "" : value.phone) : ""}/>
                    <label htmlFor={"email"}>email</label>
                    <input type={"text"} name={"email"} id={"email"}
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.email == null ? "" : value.email) : ""}/>
                    <p className={"text-danger mt-1"}>validation</p>
                </div>
                <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
            </form>
        </>
    )
}

export default StudentModal;
