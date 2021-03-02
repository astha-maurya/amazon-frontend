import React, { useState } from 'react';
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../actions/session"
import { useUserContext } from "../contexts/UserContext"
import ErrorOutlineRounded from "@material-ui/icons/ErrorOutlineRounded"
import LoadingNeeded from '../utilComponents/LoadingNeeded';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const [{ user }, dispatchUser] = useUserContext();
    const [isLoading, setLoading] = useState(false);

    const signupHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (name && email && password) {
            const user = { name, email, password };
            let error = await signup(user)(dispatchUser);
            setError(error);
            if (!error) return history.push("/");
        }
        setLoading(false);
    }

    return (
        <div className="register">
            <Link to="/">
                <img
                    className="registerLogo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png" />
            </Link>
            <div className={`${error ? "" : "hidden"} registerErrorContainer`}>
                <div>
                    <ErrorOutlineRounded className="registerErrorSymbol" />
                    <p>There was a problem</p>
                </div>
                <span>{error}</span>
            </div>
            <div className="registerContainer">
                <LoadingNeeded isComponentLoading={isLoading} overlay={true}>
                    <h1>Create Account</h1>
                    <form onSubmit={signupHandler}>
                        <h5>Name</h5>
                        <input required={true} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <h5>E-mail</h5>
                        <input required={true} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <h5>Password</h5>
                        <input required={true} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                        <button disabled={isLoading} >Create your Amazon Account</button>
                    </form>
                    <div className="registerContainerSignIn">
                        <span>Already have an account?</span>
                        <Link className="registerContainerSignInLink" to="/login">
                            <span> Sign in</span>
                        </Link>
                    </div>
                </LoadingNeeded>
            </div>
        </div>
    );
}

export default Register;