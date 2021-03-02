import React, { useEffect, useState } from 'react';
import "./Address.css";
import ExistingAddressBlock from "./ExistingAddressBlock"
import { getAddress } from '../actions/address';
import AddNewAddress from "./AddNewAddress";
import LoadingNeeded from '../utilComponents/LoadingNeeded';


export default function Address() {
    const [addressArray, setAddressArray] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            let fetchedAddress = await getAddress();
            if (fetchedAddress.res) setAddressArray(fetchedAddress.res);
        }
        fetchAddress()
            .then(() => setLoading(false));
    }, [])

    return (
        <div className="address">
            <div className="addressHeader">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/x-locale/checkout/checkout-spc-address-banner._CB485947649_.gif" />
            </div>
            <div className="addressContent">
                <div className="addressGeneralInfo">
                    <h1>Select a delivery address.</h1>
                    <p>Is the address you'd like to use displayed below?
                    if so, click the corresponding "Deliver to this address" button.
                    Or you can enter a new address.
                    </p>
                </div>
                <LoadingNeeded isComponentLoading={isLoading}>
                    {addressArray.length ?
                        <div className="addressList">
                            <h2>Pick an Address</h2>
                            <div className="addressListFlex">
                                {
                                    addressArray
                                        .map(a => <ExistingAddressBlock
                                            key={a._id}
                                            _id={a._id}
                                            name={a.name}
                                            mobileNumber={a.mobileNumber}
                                            pinCode={a.pinCode}
                                            line1={a.line1}
                                            line2={a.line2}
                                            line3={a.line3}
                                            city={a.city}
                                            state={a.state}
                                            type={a.type}
                                        />)
                                }
                            </div>
                        </div> :
                        <div className="addressList">
                            <h5>No address saved. Add New!</h5>
                        </div>}
                </LoadingNeeded>
                <div className="addressDivider"></div>
                <AddNewAddress />
            </div>
        </div>
    );
}