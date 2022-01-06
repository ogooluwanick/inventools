import React from 'react'
import { Link } from 'react-router-dom'
import "./UserCheckout.css"


export const UserCheckout = (props) => {
    
    
    return (
        <div>

            
            <div className='UserLogin'>
                <form action="" className="loginForm" onsubmit>
                <div>
                    <h1>Sign In</h1>
                </div>
                
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input  type="email" id="email" placeholder='Enter Email' required />  
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter Password' required />  
                </div>
                <div>
                    <label htmlFor=""/>
                    <button className="checkoutBtn"> <div style={{fontSize: '15px',padding:"5px"}}>LogIn</div>   </button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        New User? <Link to={`/register?redirect=$`}>Create Your Acctount</Link> 
                    </div>
                </div>
            </form>
                
            </div>
        </div>
    )
}

export default UserCheckout;