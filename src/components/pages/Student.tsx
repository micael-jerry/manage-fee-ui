import React, {useEffect, useState} from "react";
import axios from "axios";

const Student: React.FC<{}> = (props) => {
    const [users, setUsers] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then((res) => {
                setUsers(res);
            }).catch((err) => {
            console.log(err)
        })
    })

    return (
        <div className={"container"}>
            <h1>Student page</h1>
        </div>
    )
}

export default Student;
