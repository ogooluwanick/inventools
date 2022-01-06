import React, { useEffect }  from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { removeFromCart } from '../../actions/cartActions'
import "./PlaceOrder.css"
import { createOrder } from '../../actions/orderActions'
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants'



export default function PlaceOrder() {
    let nav=useNavigate();
    const cart =useSelector(state => state.cart)
    if(!(cart.paymentMethod)){
        nav("/payment")
    }
    const orderCreate =useSelector((state)=>state.orderCreate)
    const {loading, success,error,order}=orderCreate

    const dispatch= useDispatch();
    

    const removeFromCartHandler= (id)=>{
        dispatch(removeFromCart(id))
    };

    const toPrice=(num)=>Number(num.toFixed(2))
    cart.itemsPrice= toPrice(cart.cartItems.reduce((a,c)=>a+c.qty*c.price, 0))
    cart.shippingPrice= cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice= toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice= cart.itemsPrice + cart.shippingPrice + cart.taxPrice


    const placeOrderHandler=()=>{
        dispatch(createOrder({...cart, orderItems: cart.cartItems }))
         nav(`/order/`)
    }
    
    useEffect(()=>{
        if (success){
            nav(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    },[dispatch,order,nav,success])
    return (
        <div className='UserLogin' >
           <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
           <div id='placeOrderItems'>
                <div className="placeOrderRow top">
                    <div className="placeOrderCol2">
                        <ul >
                            <li className='placeOrderseperator'>
                                <div className="placeOrderRowCard">
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>{cart.shippingAddress.fullName} <br />
                                        <strong>Address: </strong>{cart.shippingAddress.address},
                                        {cart.shippingAddress.city} ,
                                        {cart.shippingAddress.postCode},
                                        {cart.shippingAddress.country} <br />
                                    </p>
                                </div>
                            </li>
                            <li className='placeOrderseperator'>
                                <div className="placeOrderRowCard">
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method: </strong>{cart.paymentMethod}
                                    </p>
                                </div>
                            </li>
                            <li className='placeOrderseperator'>
                                <div className="placeOrderRowCard">
                                    <h2>Ordered Items</h2>
                                    <ul >
                                            {
                                                cart.cartItems.map((item)=>(
                                                    <li key={item.product}>
                                                        <div className='itemcPushedToCart'>
                                                            <div>
                                                                <img src={item.img} alt={item.name} className='customerShowImg'/>
                                                            </div>
                                                            <div>
                                                                <Link className="cartLinks" to={`/Product/${item.product}`} > <span className='cartLinks'>{item.name} </span></Link>
                                                            </div>

                                                            <div>{item.qty} x {item.price}TL = {item.price *  item.qty}</div>
                                                        
                                                            <div>
                                                                <button className='deleteCartItem' type='button' onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                                                            </div>
                                                        </div>

                                                    </li>
                                                ))
                                            }
                                        </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='' > 
                    <div className='placeOrderBox' >
                        <ul>
                            <li>
                                <h2>Order Summery</h2>
                            </li>
                            <li>
                                <div id='placeOrderBoxFlat'>
                                    <div>Items</div>
                                    <div>{cart.itemsPrice.toFixed(2)}TL</div>
                                </div>
                            </li>
                            <li>
                                <div id='placeOrderBoxFlat'>
                                    <div>Shipping</div>
                                    <div>{cart.shippingPrice.toFixed(2)}TL</div>
                                </div>
                            </li>
                            <li>
                                <div id='placeOrderBoxFlat'>
                                    <div>Tax</div>
                                    <div>{cart.taxPrice.toFixed(2)}TL</div>
                                </div>
                            </li>
                            <li>
                                <div id='placeOrderBoxFlat'>
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>{cart.totalPrice.toFixed(2)}TL</strong></div>
                                </div>
                            </li>
                            <li>
                                <button  type='submit' className='checkoutBtn' onClick={placeOrderHandler} disabled={cart.cartItems.length===0}>Place Order</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant='danger'>{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
                </div>
           </div>
    )
}

