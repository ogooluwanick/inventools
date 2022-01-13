import React from 'react'
import "./Topbar.css"
import {NotificationsNone,ShoppingCartOutlined,Settings,Timeline,ExpandMore} from '@material-ui/icons';
import Searchbar from './Searchbar';
import siteData from "./searchData.json"
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';


export default function Topbar() {
    const userSignin=useSelector((state)=> state.userSignin);
    const {userInfo}= userSignin;
    const cart=useSelector((state)=> state.cart);
    const {cartItems}= cart;
    let location = useLocation();
    const dispatch= useDispatch();
    const signOutHandler=()=>{
        dispatch(signout())
    }


    


    return (
        <div className="topbar">{/*Header*/}
            <div className="topbarWrap">

            <div className="topLeft">
                {
                    userInfo?
                    (
                        <>
                            <Link to="/home" className='brand_logo'>
                                    <img src="tool_logo.png" alt="Logo" width="30" height="30" className="imgspin"  ></img>
                                    InvenTools
                            </Link>
                        </>
                    ):
                    (
                        <>
                            <Link to="/" className='brand_logo'>
                                    <img src="tool_logo.png" alt="Logo" width="30" height="30" className="imgspin"  ></img>
                                    InvenTools
                            </Link>
                        </>
                    )
                }   

            
            </div>

            {
                userInfo &&
                (
                    <>
                        <div className='searchBar'>
                            <Searchbar placeholder="Search..." data={siteData}> </Searchbar>
                        </div>
                    </>
                )
            }



                <div className="topRight">
                    <div className="topbarIconsContainer" hidden>
                        <a href="https://webprojectdemo-3a4dc.web.app/" className="linkDecor">
                            <NotificationsNone/>
                            <span className="topIconbadge"> 0 </span>
                        </a>
                    </div>


                    {
                        !(location.pathname==="/signin")&&
                        (<div className="topbarIconsContainer">
                            <Link to="/cart" className='linkDecor'>
                                <ShoppingCartOutlined/>
                                <span className="topIconbadge"> {cartItems.length} </span>
                            </Link>
                                
                                
                        
                        </div>)
                        
                    }
                    <div className="topbarIconsContainer">
                        <a href="https://webprojectdemo-3a4dc.web.app/" className="linkDecor">
                            <Timeline/>
                        </a>
                    </div>
                   
                    {
                        userInfo?(
                            <>
                            <div className="topbarIconsContainer">
                                <a href="/profile" className="linkDecor">  
                                    <Settings/>
                                </a>
                            </div>
                            <div className="userDropDown">
                                <Link  to="#">{
                                                userInfo.avater
                                                ?(<div><img src={userInfo.avater} alt="userAvater" className="productlistImg" /><ExpandMore id='ExpandMore'/></div>)
                                                :(<div>{userInfo.username}<ExpandMore id='ExpandMore'/></div>)
                                              }
                                </Link>
                                <ul className="dropDownContent">
                                    <li ><Link to="/profile" className='topbarLink'>{userInfo.username}</Link></li>
                                    <li><Link to="/" className='topbarLink'>Order History</Link></li>
                                    <li><Link to="/"  className='topbarLink' onClick={signOutHandler}>Sign Out</Link></li>
                                </ul>
                            </div>
                            </>

                        ):
                        (
                            <Link to="/signin" >
                                <h4>Sign in</h4>
                            </Link>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin &&(
                            <div className="userDropDown" style={{marginLeft:"15px" ,marginTop:"10px"}}>
                                <Link to="#admin"  className='topbarLinkNoDeco' style={{display:"flex",alignItems:"center"}}>
                                    <span>Admin</span>  
                                    <ExpandMore id='ExpandMore'  style={{marginLeft:"-5px"}}/>
                                </Link>
                                <ul className="dropDownContent" style={{marginTop:"0px"}}>
                                    <li ><Link to="/dashboard" className='topbarLink'>Dashboard</Link></li>
                                    <li><Link to="/productlist" className='topbarLink'>Products</Link></li>
                                    <li><Link to="/orderlist" className='topbarLink'>Orders</Link></li>
                                    <li><Link to="/"  className='topbarLink' onClick={signOutHandler}>Sign Out</Link></li>
                                </ul>
                            </div>
                        )
                    }
                    
                        
                    
                </div>
                
            </div>
            
        </div>
    )
}
