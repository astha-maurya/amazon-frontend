import React, { useEffect, useState } from 'react';
import "./Login.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { login } from "../actions/session"
import { useUserContext } from "../contexts/UserContext";
import ErrorOutlineRounded from "@material-ui/icons/ErrorOutlineRounded"
import LoadingNeeded from '../utilComponents/LoadingNeeded';

function Login() {
    const history = useHistory();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [{ user }, dispatchUser] = useUserContext();
    const [isLoading, setLoading] = useState(false);

    const redirectMessage = location.state ? location.state.message : "";
    const nextPage = location.state ? (location.state.from || "/") : "/";
    const loginHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (email && password) {
            const user = { email, password };
            if (location.state) location.state.message = "";
            let error = await login(user)(dispatchUser);
            if (error) setError(error);
            if (!error) return history.push(nextPage);
        }
        setLoading(false);
    };

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="loginLogo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png" />
            </Link>
            <div className="redirectMessage"> {redirectMessage}</div>
            <div className={`${error ? "" : "hidden"} loginErrorContainer`}>
                <div>
                    <ErrorOutlineRounded className="loginErrorSymbol" />
                    <p>There was a problem</p>
                </div>
                <span>{error}</span>
            </div>
            <div className="loginContainer">
                <LoadingNeeded isComponentLoading={isLoading} overlay={true}>
                    <h1>Sign in</h1>
                    <form onSubmit={loginHandler}>
                        <h5>E-mail</h5>
                        <input required={true} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <h5>Password</h5>
                        <input required={true} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button disabled={isLoading}>Sign In</button>
                    </form>
                    <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                    <Link to="/register">
                        <button className="loginContainerRegisterButton">Create your Amazon Account</button>
                    </Link>
                </LoadingNeeded>
            </div>
        </div>
    );
}

export default Login;