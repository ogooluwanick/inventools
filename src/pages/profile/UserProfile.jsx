import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { detailsUser } from '../../actions/userActions'
import LoadingBox from '../../components/loadingbox/LoadingBox'
import MessageBox from '../../components/messagebox/MessageBox'
import "./UserProfile.css"


export const UserProfile = () => {
    const [name,setName]= useState('')
    const [username,setUsername]= useState('')
    const [email,setEmail]= useState('')
    const [passWord,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const dispatch=useDispatch();
    let location = useLocation();
    const nav = useNavigate();
    

    const userSignin=useSelector((state)=> state.userSignin);
    const {userInfo ,loading,error}= userSignin;
    
    const redirect=location.search
                    ?location.search.split('=')[1]
                    :"/home";
   
    const submithandler=(e)=>{
        e.preventDefault()
        if (userInfo){
            alert("Success")
        }
        if(passWord!==confirmPassword){
            alert('Passwords do not Match!!')
        }
        else
        {
            dispatch(detailsUser(name,email,passWord,username))
        }

    }

    useEffect(()=>{
        
    },[nav,userInfo,redirect])
   
    return (
        <div className='UserLogin' >
            <form action="" className="profileForm" onSubmit={submithandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading?<LoadingBox></LoadingBox>
                    :
                    error?<MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        <div>
                            <lablel htmlFor="username" className="profileLableInfo">Username</lablel>
                            <input 
                                id='username'
                                type="text"
                                className="profileInputInfo" 
                                value={userInfo.username}
                                placeholder='Enter Username...'
                                required onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <lablel htmlFor="name" className="profileLableInfo">Name</lablel>
                            <input 
                                id='name'
                                type="text"
                                className="profileInputInfo" 
                                value={userInfo.name}
                                placeholder='Enter Name...'
                                required onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <lablel htmlFor="email" className="profileLableInfo">Email</lablel>
                            <input 
                                id='email'
                                type="text"
                                className="profileInputInfo" 
                                value={userInfo.email}
                                placeholder='Enter Email...'
                                required onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <lablel htmlFor="password" className="profileLableInfo">Password</lablel>
                            <input 
                                id='password'
                                type="password"
                                className="profileInputInfo" 
                                placeholder='Enter Email...'
                                required onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <lablel htmlFor="confirmPassword" className="profileLableInfo">Confirm Password</lablel>
                            <input 
                                id='confirmPassword'
                                type="password"
                                className="profileInputInfo" 
                                placeholder='Confirm Password...'
                                required onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <div>
                            <lablel/>
                            <button type='submit' className='checkoutBtn' id='majorBtnHoverStyle'>Update</button>
                        </div>

                    </>
                }
            </form>
            
        </div>
    )
}
export default UserProfile;