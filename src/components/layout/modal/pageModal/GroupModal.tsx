import React, {useEffect, useState} from "react";
import './modal.css'
import {GroupType} from "../../../../types";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../../../properties";

const GroupModal: React.FC<{
    modalValue: any,
    request: string | null,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {modalValue, request, credentials} = props;
    const [value, setValue] = useState<GroupType>();

    useEffect(() => {
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue({id: null, name: "", description: null})
        }
    }, [modalValue]);

    const onSubmit = async () => {
        if (credentials) {
            if (request == "add") {
                let data = [];
                data.push(value)
                await axios({
                    method: "post",
                    url: BASE_URL + "/group",
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
                    url: BASE_URL + "/group/" + value!.id,
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

    const inputChangeValue = async (event: any) => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "name") {
            setValue((state: any) => {
                return {...state, "name": value}
            });
        } else if (key === "description") {
            setValue((state: any) => {
                return {...state, "description": value}
            });
        }
    }

    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"type"}>Name</label>
                    <input type={"text"} name={"name"} id={"name"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.name) : ""}/>
                    <label htmlFor={"type"}>Description</label>
                    <input type={"text"} name={"description"} id={"description"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.description == null ? "" : value.description) : ""}/>
                </div>
            </form>
            <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
        </>
    )
}
export default GroupModal;
