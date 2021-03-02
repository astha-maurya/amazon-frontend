import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteAddress } from '../actions/address';
import { updatePendingOrderShipAddress } from '../actions/pendingOrder';
import { usePendingOrderContext } from '../contexts/PendingOrderContext';
import "./ExistingAddressBlock.css";


export default function ExistingAddressBlock({ _id, name, mobileNumber, pinCode, line1, line2, line3, city, state, type }) {
    const history = useHistory();
    const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
    const [isDeleted, setDeleted] = useState(false);

    const onSelect = async () => {
        const { res, er } = await updatePendingOrderShipAddress(_id)(dispatchPendingOrder);
        if (res) history.push("/buy/shipoptionselect");
    }

    const onDelete = async () => {
        const { res, er } = await deleteAddress(_id);
        if (res) setDeleted(true);
    }

    return (
        isDeleted
            ?
            <></>
            :
            <div className="existingAddressBlock">
                <div className="exAddContents">
                    <span className="exAddName">{name} </span>
                    <span className="exAddLine1">{line1}</span>
                    <span className="exAddLine2">{line2}</span>
                    <span className="exAddCityStatePin">{`${city}, ${state} ${pinCode}`}</span>
                    <span className="exAddCountry">India</span>

                </div>
                <div className="exAddOptions">
                    <button onClick={onSelect}>Deliver to this address</button>
                    <div className="exAddOptionsModify">
                        <button onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
    );
}