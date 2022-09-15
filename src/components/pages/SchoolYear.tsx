import React, {useEffect, useState} from "react";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../properties";
import {SchoolYearType} from "../../types";

const SchoolYear: React.FC<{
    toggleModal: (modal: string) => void,
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {toggleModal, setModalValue, setRequest, credentials} = props;
    const [schoolYears, setSchoolYears] = useState<SchoolYearType[]>();

    useEffect(() => {
        if (credentials) {
            axios({
                method: "get",
                url: BASE_URL + "/school-year",
                auth: credentials
            }).then((res: any): void => {
                setSchoolYears(res.data);
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
                url: BASE_URL + "/school-year/" + id,
                auth: credentials
            }).then((res: any) => {
                setModalValue(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        await toggleModal("schoolYearModal");
    }

    return (
        <>
            <h2>School year List</h2>
            <div className="table-responsive">
                <table id={"table"} className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">School Year</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (schoolYears || []).map((schoolYear: SchoolYearType) => {
                            return (
                                <tr key={schoolYear.id}>
                                    <td>{schoolYear.startYear} - {schoolYear.endYear}</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => {
                                                    getModalValue(schoolYear.id == null ? 0 : schoolYear.id);
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

export default SchoolYear;
