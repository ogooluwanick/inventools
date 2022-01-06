import React from 'react'
import "./Topbar.css"
import {NotificationsNone,ShoppingCartOutlined,Settings,Timeline,ExpandMore} from '@material-ui/icons';
import Searchbar from './Searchbar';
import siteData from "./searchData.json"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';


export default function Topbar() {
    const userSignin=useSelector((state)=> state.userSignin);
    const {userInfo}= userSignin;
    const cart=useSelector((state)=> state.cart);
    const {cartItems}= cart;
    const dispatch= useDispatch();
    const signOutHandler=()=>{
        dispatch(signout())
    }


    return (
        <div className="topbar">{/*Header*/}
            <div className="topbarWrap">

            <div className="topLeft">
                <Link to="/" className='brand_logo'>
                        <img src="tool_logo.png" alt="tools_logo" width="30" height="30" className="imgspin"  ></img>
                        InvenTools
                </Link>

            
            </div>

            <div className='searchBar' >
                <Searchbar placeholder="Search..." data={siteData}> </Searchbar>
            </div>



                <div className="topRight">
                    <div className="topbarIconsContainer">
                        <a href="https://webprojectdemo-3a4dc.web.app/" className="linkDecor">
                            <NotificationsNone/>
                            <span className="topIconbadge"> 0 </span>
                        </a>
                    </div>
                    <div className="topbarIconsContainer">
                        <Link to="/cart" className='linkDecor'>
                            <ShoppingCartOutlined/>
                            <span className="topIconbadge"> {cartItems.length} </span>
                        </Link>
                            
                            
                       
                    </div>
                    <div className="topbarIconsContainer">
                        <a href="https://webprojectdemo-3a4dc.web.app/" className="linkDecor">
                            <Timeline/>
                        </a>
                    </div>
                    <div className="topbarIconsContainer">
                        <a href="https://webprojectdemo-3a4dc.web.app/" className="linkDecor">  
                            <Settings/>
                        </a>
                    </div>
                    {
                        userInfo?(
                            <div className="userDropDown">
                                <Link to="#">{/*userInfo.name*/}<ExpandMore/></Link>
                                <ul className="dropDownContent">
                                    <Link to="#signout" onClick={signOutHandler}>Sign Out</Link>
                                </ul>
                            </div>

                        ):
                        (
                            <Link to="/signin" >
                                <h4>Sign in</h4>
                            </Link>
                        )
                    }
                    
                        
                    
                </div>
                
            </div>
            
        </div>
    )
}
