import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { siginin } from '../../actions/userActions'
import MessageBox from '../../components/messagebox/MessageBox'
import LoadingBox from "../../components/loadingbox/LoadingBox"
import "./UserLogin.css"


export const UserLogin = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const dispatch=useDispatch();
    let location = useLocation();
    const nav = useNavigate()




    const redirect=location.search
                    ?location.search.split('=')[1]
                    :"/";


    const userSignin=useSelector((state)=> state.userSignin);
    const {userInfo,error,loading }= userSignin;
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(siginin(email,password))
    }
   
    useEffect(()=>{
        if (userInfo){
             nav(redirect)
            
        }
    },[nav,redirect,userInfo])
   
    
    return (
        <div className='UserLogin' id='UserLogin'>
            <form action="" className="loginForm" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>  }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input  type="email" id="email" placeholder='Enter Email' required onChange={(e)=>setEmail(e.target.value)}/>  
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter Password' required onChange={(e)=>setPassword(e.target.value)}/>  
                </div>
                <div>
                    <label htmlFor=""/>
                    <button className="checkoutBtn" id='majorBtnHoverStyle'> <div style={{fontSize: '15px',padding:"5px"}}>LogIn</div>   </button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        New User? <Link to={`/register?redirect=${redirect}`}>Create Your Acctount</Link> 
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserLogin