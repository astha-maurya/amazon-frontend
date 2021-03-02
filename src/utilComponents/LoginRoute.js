import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const LoginRoute = ({ children, ...rest }) => {
    const [{ user }, dispatchUser] = useUserContext();
    return (
        <Route
            {...rest}
            render={() =>
                !user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    )
            }
        />
    );
}

export default LoginRoute;