import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import "./PaymentMethod.css"

export default function PaymentMethod() {
    const nav = useNavigate()
    const cart =useSelector((state)=>state.cart)
    const {shippingAddress}=cart
    if (!shippingAddress.address){
        nav('/shipping_address')
    }

    const dispatch=useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const submitPaymentHandler=(e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        nav('/place_order')
    }
    return (
        <div className="UserLogin">
             <CheckoutSteps step1 step2 step3></CheckoutSteps>
             <form action="" className="paymentForm" onSubmit={submitPaymentHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div className='paymentMethodRadios'>
                        <input type="radio"
                               id='paypal' 
                               value='PayPal' 
                               name='paymentMethod' 
                               required checked 
                               onChange={(e)=>setPaymentMethod(e.target.value)}/>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div className='paymentMethodRadios'>
                        <input type="radio"
                               id='stripe' 
                               value='Stripe' 
                               name='paymentMethod' 
                               required  
                               onChange={(e)=>setPaymentMethod(e.target.value)}/>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <button className='checkoutBtn' id='majorBtnHoverStyle' type='submit' >Proceed</button>


             </form>
           
        </div>
    )
}
