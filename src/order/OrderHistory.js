import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getOrderHistory } from '../actions/orderHistory';
import { useUserContext } from '../contexts/UserContext';
import LoadingNeeded from '../utilComponents/LoadingNeeded';
import OrderBlock from './OrderBlock';
import "./OrderHistory.css";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [{ user }, dispatchUser] = useUserContext();

    useEffect(() => {
        const fetchOrders = async () => {
            const result = await getOrderHistory();
            if (result.res) {
                setOrders(result.res);
            }
            setLoading(false);
        }
        fetchOrders();
    }, [setOrders]);

    return (
        <div className="orderHistoryWrapper">
            <div className="orderHistory">
                <div className="orderHistoryHeader">
                    <h1>Your Orders</h1>
                </div>
                <LoadingNeeded isComponentLoading={isLoading}>
                    {
                        orders.length
                            ?
                            <div className="orderHistoryFlex">
                                {
                                    orders.map((order) =>
                                        <OrderBlock order={order} />
                                    )
                                }
                            </div>
                            :
                            <div className="orderHistoryEmpty">
                                Hey <span>{user.name}</span>! Looks like you haven't placed an order yet.
                                <br />
                                <Link to="/">Shop Now!</Link>
                            </div>
                    }
                </LoadingNeeded>
            </div>
        </div>
    );
}

export default OrderHistory;