import { Link } from 'react-router-dom';
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import MessageBox from '../../components/messagebox/MessageBox'
import "./Cart.css"

export default function Cart() {

    const {ProductId}= useParams()
    const location= useLocation()
    const nav = useNavigate()

    

    const qty = Number(new URLSearchParams(location.search).get("qty"))
                ? Number(new URLSearchParams(location.search).get("qty"))
                : 1;
    
    const cart = useSelector(state=>state.cart);
    const {cartItems}= cart
    const dispatch= useDispatch();

    useEffect(()=>{
        if(ProductId){
            dispatch(addToCart(ProductId,qty));
        }

    },[dispatch, ProductId,qty])

    const removeFromCartHandler= (id)=>{
        dispatch(removeFromCart(id))
    };

    const checkOutHandler=()=>{
        nav("/signin?redirect=shipping_address")
    }

    return (
        <div className="cartPage">
            <div className="cartTitle">
                <h1>Shopping Cart</h1> 
            </div>
            <div className="cartDetails">
                <div className="cartItems">
                    <p>{cartItems.length===0
                    ?<MessageBox variant="success">
                        Cart is Empty. <Link to="/ProductList" id="goShoppingLink" >Go shopping</Link>
                    </MessageBox>
                    :
                    (
                        <ul>
                            {
                                cartItems.map((item)=>(
                                    <li key={item.product}>
                                        <div className='itemcPushedToCart'>
                                            <div>
                                                <img src={item.img} alt={item.name} className='customerShowImg'/>
                                            </div>
                                            <div>
                                                <Link className="cartLinks" to={`/Product/${item.product}`} > <span className='cartLinks'>{item.name} </span></Link>
                                            </div>
                                            <div>
                                                <select
                                                    className="qtySelect" 
                                                    style={{width:"50px", height:"30px"}}
                                                    value={item.qty} 
                                                    onChange={(e)=>dispatch(addToCart(item.product, e.target.value))}>
                                                    {
                                                        [...Array(item.stock).keys()].map(x=>(
                                                            <option key={x+1} value={x+1} >{x+1}</option>
                                                        ))}    
                                                </select>
                                            </div>
                                            <div>{item.price}TL</div>
                                            <div>
                                                <button className='deleteCartItem' type='button' onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                                            </div>
                                        </div>

                                    </li>
                                ))
                            }
                        </ul>
                    )}</p>
                </div>
                <div className="cartCheckoutBox">
                    <div>Subtotal ({cartItems.reduce((a,c)=> a+c.qty,0)}  items) : {cartItems.reduce((a,c)=> a + c.price * c.qty, 0)}TL</div>
                    <button className='checkoutBtn' id='majorBtnHoverStyle'  onClick={checkOutHandler}  disabled={cartItems.length === 0}>Checkout</button>
                </div>
            </div>
            <br />
           
        </div>
    )
}
