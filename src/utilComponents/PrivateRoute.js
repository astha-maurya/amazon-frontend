import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const PrivateRoute = ({ children, ...rest }) => {
    const [{ user }, dispatchUser] = useUserContext();
    return (
        <Route
            {...rest}
            render={() =>
                user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    message: "You need to login to view the requested pages.",
                                    from: rest.path
                                }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;