import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import SearchIcon from "@material-ui/icons/Search";
import { useCartContext } from "../contexts/CartContext";
import { useUserContext } from "../contexts/UserContext";
import { logout } from "../actions/session";
import { cartSize } from '../reducers/cartReducer';
import * as queryString from 'query-string';
import SideNav from './SideNav';

function NavBar() {
    const history = useHistory();
    const [headerSearchFocus, setHeaderSearchFocus] = useState(false);
    const [{ cart }, dispatchCart] = useCartContext();
    const [{ user }, dispatchUser] = useUserContext();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sideNavActive, setSideNavActive] = useState(false);

    const onSearch = () => {
        const keyword = queryString.stringify({ k: searchKeyword.replace(/\s+/g, " ") });
        history.push(`/s?${keyword}`);
    }

    return (
        <nav className="navBar">
            <div className="navBarSideNavButton" onClick={() => setSideNavActive(true)}>☰</div>
            <SideNav setSideNavActive={setSideNavActive} sideNavActive={sideNavActive} />
            <Link to="/">
                <img className="headerLogo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"></img>
            </Link>
            <div className={`headerSearch ${headerSearchFocus && "headerSearchFocus"}`}>
                <input
                    type="text"
                    className="headerSearchBar"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && onSearch()}
                    onFocus={() => setHeaderSearchFocus(!headerSearchFocus)}
                    onBlur={() => setHeaderSearchFocus(!headerSearchFocus)} />
                <SearchIcon className="headerSearchIcon" onClick={onSearch} />
            </div>
            <div className="headerNav">
                <img className="headerNavCountryFlag" src="https://img.icons8.com/color/25/000000/india.png" alt="languageIcon" />
                <Link className="headerLink" to="/login" onClick={() => { if (user) logout()(dispatchUser); }}>
                    {!user ? <div className="headerOption">
                        <span className="headerOptionLineOne"> Hello</span>
                        <span className="headerOptionLineTwo">Sign In</span>
                    </div> :
                        <div className="headerOption">
                            <span className="headerOptionLineOne"> Hello<strong> {user.name} </strong></span>
                            <span className="headerOptionLineTwo">Logout</span>
                        </div>}
                </Link>
                <Link className="headerLink" to="/order-history">
                    <div className="headerOption">
                        <span className="headerOptionLineOne"> Returns</span>
                        <span className="headerOptionLineTwo"> & Orders</span>
                    </div>
                </Link>
                <Link className="headerLink" to="/checkout">
                    <div className="headerOptionBasket">
                        <div>
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/gno/sprites/nav-sprite-global-2x-hm-dsk-reorg._CB405936311_.png" />
                        </div>
                        <span className="headerBasketCount">{cartSize(cart)}</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;