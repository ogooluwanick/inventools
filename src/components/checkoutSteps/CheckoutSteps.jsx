import React from "react"
import { Link } from "react-router-dom"
import "./CheckoutSteps.css"



export default function CheckoutSteps(props) { 
    return (
        <div className="checkout-steps">
            <div className={props.step1? 'active':" "}>  <Link className="checkoutLinks" to="/signin">Signin</Link></div>
            <div className={props.step2? 'active':" "}>  <Link className="checkoutLinks" to="/shipping_address">Shipping</Link></div>
            <div className={props.step3? 'active':" "}>  <Link className="checkoutLinks" to="/payment">Payment</Link></div>
            <div className={props.step4? 'active':" "}>  <Link className="checkoutLinks" to="/place_order">Place Order</Link></div>
        </div>
    )
}

