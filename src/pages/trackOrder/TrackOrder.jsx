import React, { useEffect }  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {  useParams } from 'react-router-dom'
import {Link} from "react-router-dom"
import "./TrackOrder.css"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { detailsOrder } from '../../actions/orderActions'
import {PayPalButton} from "react-paypal-button-v2"



export default function TrackOrder() {
    let orderId= useParams(); 
    const orderDetails   =useSelector((state)=>state.orderDetails);
    const {order, loading,error}=orderDetails;

    const dispatch= useDispatch();
  
    useEffect(()=>{
            dispatch(detailsOrder(orderId.id))
        
    },[dispatch,orderId])

    const successPaymentHandler=()=>{
        //
    }

    return  loading? (<div className="customerPage">
                            <div className="LoadingBoxcustomerPage"><LoadingBox></LoadingBox></div>
                      </div>):
            error?(<div className="customerPage">
                        <div className="LoadingBoxcustomerPage"><MessageBox variant="danger">{error}</MessageBox></div>
                    </div>)
            :(
                <div className='trackOrderPage' >
                    <div id='trackOrderItems'>
                       
                            
                            <div className="trackOrderRow top">
                                <div className="trackOrderCol2">
                                    <ul >
                                        <li className='trackOrderseperator'>
                                            <h2 className="trackingtitle">Order <span className="trackingID">{order._id}</span></h2>
                                            <div className="trackOrderRowCard">
                                                <h2>Shipping</h2>
                                                <p>
                                                    <strong>Name: </strong>{order.shippingAddress.fullName} <br />
                                                    <strong>Address: </strong>{order.shippingAddress.address},
                                                    {order.shippingAddress.city} ,
                                                    {order.shippingAddress.postCode},
                                                    {order.shippingAddress.country} <br />
                                                </p>
                                                {order.isDelivered?
                                                   (<div className="trackingMessagebox">  <MessageBox variant="success"> Delivered at {order.deliveredAt}</MessageBox></div>   )
                                                    :( <div className="trackingMessagebox">  <MessageBox variant="danger"> Not Delivered</MessageBox> </div> )  
                                                }
                                            </div>
                                        </li>
                                        <li className='trackOrderseperator'>
                                            <div className="trackOrderRowCard">
                                                <h2>Payment</h2>
                                                <p>
                                                    <strong>Method: </strong>{order.paymentMethod}
                                                </p>
                                                {order.isPaid?
                                                   (<div className="trackingMessagebox">  <MessageBox variant="success"> Paid at {order.paidAt}</MessageBox></div>   )
                                                    :( <div className="trackingMessagebox">  <MessageBox variant="danger"> Not Paid</MessageBox> </div> )  
                                                }
                                            </div>
                                        </li>
                                        <li className='trackOrderseperator'>
                                            <div className="trackOrderRowCard">
                                                <h2>Ordered Items</h2>
                                                <ul >
                                                        {
                                                            order.orderItems.map((item)=>(
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
                            <div className='trackOrderBoxCase' > 
                                <div className='trackOrderBox' >
                                    <ul>
                                        <li>
                                            <h2>Order Summery</h2>
                                        </li>
                                        <li>
                                            <div id='trackOrderBoxFlat'>
                                                <div>Items</div>
                                                <div>{order.itemsPrice.toFixed(2)}TL</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div id='trackOrderBoxFlat'>
                                                <div>Shipping</div>
                                                <div>{order.shippingPrice.toFixed(2)}TL</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div id='trackOrderBoxFlat'>
                                                <div>Tax</div>
                                                <div>{order.taxPrice.toFixed(2)}TL</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div id='trackOrderBoxFlat'>
                                                <div><strong>Order Total</strong></div>
                                                <div><strong>{order.totalPrice.toFixed(2)}TL</strong></div>
                                            </div>
                                        </li>
                                        <li>
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}>
                                            </PayPalButton>
                                        </li>
                                    
                                    </ul>
                                </div>
                            </div>
                       
                    </div>
                </div>
            )
}

