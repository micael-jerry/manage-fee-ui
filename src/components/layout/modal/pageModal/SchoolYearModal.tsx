import React, {useEffect, useState} from "react";
import './modal.css'
import {SchoolYearType} from "../../../../types";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../../../properties";

const SchoolYearModal: React.FC<{
    modalValue: any,
    request: string | null,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {modalValue, request, credentials} = props;
    const [value, setValue] = useState<SchoolYearType>();

    useEffect(() => {
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue({id: null, startYear: "", endYear: ""})
        }
    }, [modalValue]);

    const onSubmit = async () => {
        if (credentials) {
            if (request == "add") {
                let data = [];
                data.push(value)
                await axios({
                    method: "post",
                    url: BASE_URL + "/school-year",
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
                    url: BASE_URL + "/school-year/" + value!.id,
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
        if (key === "startYear") {
            setValue((state: any) => {
                return {...state, "startYear": value}
            });
        } else if (key === "endYear") {
            setValue((state: any) => {
                return {...state, "endYear": value}
            });
        }
    }

    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"type"}>Start year</label>
                    <input type={"text"} name={"startYear"} id={"startYear"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.startYear) : ""}/>
                    <label htmlFor={"type"}>End Year</label>
                    <input type={"text"} name={"endYear"} id={"endYear"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.endYear == null ? "" : value.endYear) : ""}/>
                </div>
            </form>
            <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
        </>
    )
}
export default SchoolYearModal;
