import React, { useEffect }  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {  useParams } from 'react-router-dom'
import {Link} from "react-router-dom"
import "./TrackOrder.css"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { detailsOrder } from '../../actions/orderActions'



export default function TrackOrder() {
    let orderId= useParams(); 
    const orderDetails   =useSelector((state)=>state.orderDetails);
    const {order, loading,error}=orderDetails;

    const dispatch= useDispatch();
  
    useEffect(()=>{
            dispatch(detailsOrder(orderId))
        
    },[dispatch,orderId])


    return loading? (<LoadingBox></LoadingBox>):
            error?(<MessageBox variant="danger">{error}</MessageBox>)
            :(
                <div className='UserLogin' >
                <div id='placeOrderItems'>
                        <h1>Order {order._id}</h1>
                        <div className="placeOrderRow top">
                            <div className="placeOrderCol2">
                                <ul >
                                    <li className='placeOrderseperator'>
                                        <div className="placeOrderRowCard">
                                            <h2>Shipping</h2>
                                            <p>
                                                <strong>Name: </strong>{order.shippingAddress.fullName} <br />
                                                <strong>Address: </strong>{order.shippingAddress.address},
                                                {order.shippingAddress.city} ,
                                                {order.shippingAddress.postCode},
                                                {order.shippingAddress.country} <br />
                                            </p>
                                        </div>
                                    </li>
                                    <li className='placeOrderseperator'>
                                        <div className="placeOrderRowCard">
                                            <h2>Payment</h2>
                                            <p>
                                                <strong>Method: </strong>{order.paymentMethod}
                                            </p>
                                        </div>
                                    </li>
                                    <li className='placeOrderseperator'>
                                        <div className="placeOrderRowCard">
                                            <h2>Ordered Items</h2>
                                            <ul >
                                                    {
                                                        order.cartItems.map((item)=>(
                                                            <li key={item.product}>
                                                                <div className='itemcPushedToCart'>
                                                                    <div>
                                                                        <img src={item.img} alt={item.name} className='customerShowImg'/>
                                                                    </div>
                                                                    <div>
                                                                        <Link className="cartLinks" to={`/Product/${item.product}`} > <span className='cartLinks'>{item.name} </span></Link>
                                                                    </div>

                                                                    <div>{item.qty} x {item.price}TL = {item.price *  item.qty}</div>
                                                                
                                                                  
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
                                            <div>{order.itemsPrice.toFixed(2)}TL</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div id='placeOrderBoxFlat'>
                                            <div>Shipping</div>
                                            <div>{order.shippingPrice.toFixed(2)}TL</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div id='placeOrderBoxFlat'>
                                            <div>Tax</div>
                                            <div>{order.taxPrice.toFixed(2)}TL</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div id='placeOrderBoxFlat'>
                                            <div><strong>Order Total</strong></div>
                                            <div><strong>{order.totalPrice.toFixed(2)}TL</strong></div>
                                        </div>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                        </div>
                </div>
    )
}

