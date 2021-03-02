import ErrorOutlineRounded from "@material-ui/icons/ErrorOutlineRounded";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addNewAddress } from "../actions/address";
import { updatePendingOrderShipAddress } from "../actions/pendingOrder";
import { usePendingOrderContext } from "../contexts/PendingOrderContext";
import LoadingNeeded from "../utilComponents/LoadingNeeded";
import "./AddNewAddress.css";

export default function AddNewAddress() {
    const [newAddress, setNewAddress] = useState({
        name: "",
        mobileNumber: "",
        pinCode: "",
        line1: "",
        line2: "",
        line3: "",
        city: "",
        state: "",
        type: "",
    });
    const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const addAddressHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const { name, mobileNumber, pinCode, line1, line2, city, state, type } = newAddress;
        if (name && mobileNumber && pinCode && line1 && line2 && city && state && type) {
            let addedResult = await addNewAddress(newAddress);
            if (addedResult.er) setError(addedResult.er);
            else {
                let chosenResult = await updatePendingOrderShipAddress(addedResult.res._id)(dispatchPendingOrder);
                if (chosenResult.er) setError(addedResult.er);
                else return history.push("/buy/shipoptionselect");
            }
        }
        setLoading(false);
    }

    return (
        <div className="addressAddNew">
            <LoadingNeeded isComponentLoading={isLoading} overlay={true}>
                <h2>Add a new address</h2>
                <div className={`${error ? "" : "hidden"} addressErrorContainer`}>
                    <div>
                        <ErrorOutlineRounded className="loginErrorSymbol" />
                        <p>There was a problem</p>
                    </div>
                    <span>{error}</span>
                </div>
                <form onSubmit={addAddressHandler} onInvalidCapture={(e) => e.target.classList.add("invalidInput")}>
                    <span>Full name (First and Last name)</span>
                    <input required={true} minLength={3} maxLength={25} value={newAddress.name} type="text" name="name" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>Mobile number</span>
                    <input required={true} value={newAddress.mobileNumber} placeholder="10-digit mobile number without prefixes" pattern="\d{10}" type="text" name="mobileNumber" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>PIN code</span>
                    <input required={true} value={newAddress.pinCode} placeholder="6 digits [0-9] PIN code" pattern="\d{6}" type="text" name="pinCode" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>Flat, House no., Building, Company, Apartment</span>
                    <input required={true} minLength={3} maxLength={255} value={newAddress.line1} type="text" name="line1" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>Area, Colony, Street, Sector, Village</span>
                    <input required={true} minLength={3} maxLength={255} value={newAddress.line2} type="text" name="line2" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>Landmark</span>
                    <input value={newAddress.line3} placeholder="E.g. Near AIIMS Flyover, Behind Regal Cinema, etc." type="text" name="line3" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>Town/City</span>
                    <input required={true} minLength={3} maxLength={25} value={newAddress.city} type="text" name="city" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>State / Province / Region</span>
                    <input required={true} minLength={3} maxLength={25} value={newAddress.state} type="text" name="state" onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))} />
                    <span>Address Type</span>
                    <select required={true} placeholder="Select an Address Type" name="type" value={newAddress.type} onChange={(e) => setNewAddress((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))}>
                        <option value={""}>Select an Address Type</option>
                        <option value={"home"}>Home</option>
                        <option value={"office"}>Office</option>
                    </select>
                    <button disabled={isLoading}>Add Address</button>
                </form>
            </LoadingNeeded>
        </div>
    );
}