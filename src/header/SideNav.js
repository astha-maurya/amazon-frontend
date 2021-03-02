import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import "./SideNav.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useUserContext } from "../contexts/UserContext";
import { logout } from "../actions/session";

function SideNav({ setSideNavActive, sideNavActive }) {
    const [{ user }, dispatchUser] = useUserContext();

    return (
        <div className={`sideNavContainer ${sideNavActive ? 'sideNavContainerVisible' : ''}`}>
            <div className={`sideNavBackground ${sideNavActive ? 'sideNavBackgroundVisible' : ''}`} onClick={() => setSideNavActive(false)}>
                <div className={`sideNav ${sideNavActive ? 'sideNavVisible' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <div className="sideNavCustomerProfile">
                        <AccountCircle className="sideNavCustomerProfileIcon" />
                        Hello, {user ? user.name : "Sign In"}!
                    </div>
                    <div className="sideNavMenu">
                        <div className="sideNavHeading">Quick Links</div>
                        <Link to="/" onClick={() => setSideNavActive(false)}>Home</Link>
                        <Link to="/checkout" onClick={() => setSideNavActive(false)}>My Cart</Link>
                        <Link to="/order-history" onClick={() => setSideNavActive(false)}>My Orders</Link>
                    </div>
                    <div className="sideNavMenuSeperator"></div>
                    <div className="sideNavMenu">
                        <div className="sideNavHeading">Shop by Department</div>
                        <Link to={`/category/electronics-appliances`} onClick={() => setSideNavActive(false)}>Electronics, Appliances and more</Link>
                        <Link to={`/category/fashion-clothing`} onClick={() => setSideNavActive(false)}>Fashion and Clothing</Link>
                        <Link to={`/category/home-essentials`} onClick={() => setSideNavActive(false)}>Home essentials</Link>
                        <Link to={`/category/stationery-office-supplies`} onClick={() => setSideNavActive(false)}>Stationery & office supplies</Link>
                        <Link to={`/category/beauty-grooming`} onClick={() => setSideNavActive(false)}>Beauty Grooming</Link>
                        <Link to={`/category/chocolates-sweets`} onClick={() => setSideNavActive(false)}>Chocolates, sweets & more</Link>
                        <Link to={`/category/fitness-sports`} onClick={() => setSideNavActive(false)}>Fitness and Sports</Link>
                        <Link to={`/category/amazon-pantry`} onClick={() => setSideNavActive(false)}>Amazon Pantry</Link>
                    </div>
                    <div className="sideNavMenuSeperator"></div>
                    <div className="sideNavMenu">
                        {
                            user
                                ?
                                <Link to="/" onClick={() => { logout()(dispatchUser); setSideNavActive(false); }}>Sign Out</Link>
                                :
                                <Link to="/login">Sign In</Link>
                        }
                    </div>
                </div>
                <div className="sideNavCloseButton">✖</div>
            </div>
        </div>
    );
}

export default SideNav;