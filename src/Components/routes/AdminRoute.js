import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RESULT", res);
                    setOk(true)
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERROR", err);
                    setOk(false)
                })
        }
    }, [user])

    return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />
}

export default AdminRoute;