import React, {useEffect, useState} from "react";
import './modal.css'
import {GroupType, StudentType} from "../../../../types";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../../../properties";

const StudentModal: React.FC<{
    modalValue: any,
    request: string | null,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {modalValue, request, credentials} = props;
    const [value, setValue] = useState<StudentType>();
    const [groups, setGroups] = useState<GroupType[]>();

    useEffect(() => {
        getAllGroups();
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue(
                {
                    entranceDate: "", groups: null, id: null, password: null, ref: "", username: null,
                    lastname: "", firstname: "", sex: "", birthDate: "", address: "",
                    phone: "", email: "", role: "student"
                }
            )
        }
    }, [modalValue]);

    const getAllGroups = async () => {
        if (credentials) {
            await axios({
                method: "get",
                url: BASE_URL + "/group",
                auth: credentials
            }).then((res) => {
                setGroups(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const onSubmit = async () => {
        if (credentials) {
            if (request == "add") {
                let data = [];
                data.push(value);
                await axios({
                    method: "post",
                    url: BASE_URL + "/users",
                    data: data,
                    auth: credentials
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            } else if (request == "update") {
                await axios({
                    method: "put",
                    url: BASE_URL + "/users/" + value!.id,
                    data: value,
                    auth: credentials
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
        await window.location.reload();
    }

    const inputChangeValue = (event: any): void => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "lastname") {
            setValue((state: any) => {
                return {...state, "lastname": value}
            });
        } else if (key === "firstname") {
            setValue((state: any) => {
                return {...state, "firstname": value}
            });
        } else if (key === "sex") {
            setValue((state: any) => {
                return {...state, "sex": value}
            });
        } else if (key === "birthDate") {
            setValue((state: any) => {
                return {...state, "birthDate": value}
            });
        } else if (key === "address") {
            setValue((state: any) => {
                return {...state, "address": value}
            });
        } else if (key === "phone") {
            setValue((state: any) => {
                return {...state, "phone": value}
            });
        } else if (key === "email") {
            setValue((state: any) => {
                return {...state, "email": value}
            });
        } else if (key === "group") {
            setValue((state: any) => {
                return {...state, "groups": {"id": value}}
            })
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
                    <label htmlFor={"sex"}>sex <span className={"text-danger"}>M/F</span> </label>
                    <input type={"text"} name={"sex"} id={"sex"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.sex) : ""}/>
                    <label htmlFor={"birthDate"}>birthDate <span className={"text-danger"}>format: yyyy-MM-dd</span>
                    </label>
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
                    <div className={"mt-3"}>
                        <select name={"group"} id={"group"}
                                onChange={inputChangeValue}
                                className="btn btn-sm btn-outline-secondary">
                            <option
                                value={value ? (value!.groups == null ? undefined : value!.groups.id == null ? undefined : value!.groups.id) : undefined}
                                selected={true}>
                                {value ? (value!.groups == null ? "select group" : value!.groups.name) : "select group"}
                            </option>
                            {
                                (groups || []).map((group: GroupType) => {
                                    return (
                                        <option key={group.id} value={group.id == null ? undefined : group.id}>
                                            {group.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </form>
            <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
        </>
    )
}

export default StudentModal;
