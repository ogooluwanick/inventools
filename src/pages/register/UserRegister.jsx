import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { register } from '../../actions/userActions'
import MessageBox from '../../components/messagebox/MessageBox'
import LoadingBox from "../../components/loadingbox/LoadingBox"
import "./UserRegister.css"


export const UserRegister = () => {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const dispatch=useDispatch();
    let location = useLocation();
    const nav = useNavigate()



    const redirect=location.search
                    ?location.search.split('=')[1]
                    :"/";

    const userRegister=useSelector((state)=> state.userRegister);
    const {userInfo,error,loading }= userRegister;
    
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert('Passwords do not Match!!')
        }
        else
        {
            dispatch(register(name,email,password))
        }
    }
   
    useEffect(()=>{
        if (userInfo){
             nav(redirect)
            
        }
    },[nav,redirect,userInfo])
   
    
    return (
        <div className='UserLogin'>
            <form action="" className="registerForm" onsubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>  }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input  type="text" id="name" placeholder='Enter Name' required onChange={(e)=>setName(e.target.value)}/>  
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input  type="email" id="email" placeholder='Enter Email' required onChange={(e)=>setEmail(e.target.value)}/>  
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter Password' required onChange={(e)=>setPassword(e.target.value)}/>  
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder='Confirm Password' required onChange={(e)=>setConfirmPassword(e.target.value)}/>  
                </div>
                <div>
                    <label htmlFor=""/>
                    <button className="checkoutBtn"> <div style={{fontSize: '15px',padding:"5px"}}>Register</div>   </button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        Already have an Account? <Link to={`/signin?redirect=${redirect}`}>Signin</Link> 
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserRegister
