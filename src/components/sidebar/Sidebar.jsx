import React from "react"
import "./Sidebar.css"
import { Home,Face,ErrorOutline, ShoppingBasket, StoreSharp,Receipt,MarkunreadMailbox, MailOutlineSharp,Timeline, Payment, StoreOutlined,WorkOutline,Storefront,ShowChart} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";




export default function Sidebar() {
    let location = useLocation();
    let sideBar;
    const userSignin = useSelector((state)=>state.userSignin);
    const {userInfo} = userSignin;

  


    if (location.pathname==="/" ||location.pathname==="/signin" || location.pathname==="/register" || location.pathname==="/checkout" || location.pathname.includes("signIn")||location.pathname.includes("payment")||location.pathname.includes("shipping")||location.pathname.includes("place_order"))
    {
        sideBar=<div className='sideBar' hidden></div>
    }
    else{
        sideBar=<div className='sideBar'>
                <div className="sideBarWrap">
                    
                    {
                        userInfo &&
                        (
                            <>
                                <div className="sideBarMenu">
                                    <h3 className="sideBarTitle">DashBoard</h3>
                                    <ul className="sidebarList">
                                        <Link to='/' className="linkDecor" >  
                                            <li className="sidebarListItem"  >
                                                <Home className="sideBarIcons"/> Home  
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </>
                            )
                     }
                

                    <div className="sideBarMenu">
                        <h3 className="sideBarTitle">Quick Menu</h3>
                        <ul className="sidebarList">
                            
                            {
                                userInfo &&
                                (
                                    <>
                                        <Link to='/CustomerList'  className="linkDecor">  
                                            <li className="sidebarListItem"  >
                                                <Face className="sideBarIcons"/> Customers
                                            </li>
                                        </Link>
                                    </>
                                )
                            }

                            <Link to='/ProductList' className="linkDecor" >
                                <li className="sidebarListItem">
                                    <Storefront className="sideBarIcons" /> Products
                                </li>
                            </Link>

                            {
                                userInfo &&
                                (
                                    <>
                                        <Link to='/TransactionList' className="linkDecor" >
                                            <li className="sidebarListItem">
                                                <Payment  className="sideBarIcons"/> Transactions
                                            </li>
                                        </Link>
                                    </>
                                )
                            }


                            
                            <Link to='/SalesList' className="linkDecor" hidden >
                                <li className="sidebarListItem">
                                    <Timeline  className="sideBarIcons"/> Sales
                                </li>
                            </Link>
                            <Link to='/Packages' className="linkDecor" hidden >
                                <li className="sidebarListItem">
                                    <MarkunreadMailbox  className="sideBarIcons"/> Packages
                                </li>
                            </Link>
                        </ul>
                    </div>

                    <div className="sideBarMenu">
                        <h3 className="sideBarTitle">Management</h3>
                        <ul className="sidebarList">
                            <Link to='/VendorList' className="linkDecor" >
                                <li className="sidebarListItem"  >
                                    < StoreSharp className="sideBarIcons"/>  Vendors
                                </li>
                            </Link>

                            <Link to='/Bills_InvoiceList' className="linkDecor" hidden>
                                <li className="sidebarListItem">
                                    <Receipt className="sideBarIcons" /> Bills &amp; Invoice
                                </li>
                            </Link>
                            
                            {
                                userInfo &&
                                (
                                    <>
                                        <Link to='/ReturnList' className="linkDecor" >
                                            <li className="sidebarListItem">
                                                <StoreOutlined  className="sideBarIcons"/> Returns
                                            </li>
                                        </Link>
                                        <Link to='/OrderList' className="linkDecor" >
                                            <li className="sidebarListItem">
                                                <ShoppingBasket  className="sideBarIcons"/> Orders
                                            </li>
                                        </Link>
                                    </>
                                )
                            }
                           

                        </ul>
                    </div>
                    
                    <div className="sideBarMenu">
                        <h3 className="sideBarTitle">Market</h3>
                        <ul className="sidebarList">
                            <Link to='/ReturnsList' className="linkDecor" hidden>
                                <li className="sidebarListItem"  >
                                    <MailOutlineSharp className="sideBarIcons"/>   Mail
                                </li>
                            </Link>

                            <Link to='/stock' className="linkDecor" >
                                <li className="sidebarListItem">
                                    <ShowChart className="sideBarIcons" />  Stocks
                                </li>
                            </Link>

                        </ul>
                    </div>

                    
                    {
                        userInfo &&
                        (
                            <div className="sideBarMenu">
                                <h3 className="sideBarTitle">Staff</h3>
                                <ul className="sidebarList">
                                    <Link to='/ReturnsList' className="linkDecor" >
                                        <li className="sidebarListItem">
                                            <WorkOutline className="sideBarIcons" />  Manage
                                        </li>
                                    </Link>

                                    <Link to='/ReturnsList' className="linkDecor" hidden >
                                        <li className="sidebarListItem"  >
                                            <Home className="sideBarIcons"/> Integrations
                                        </li>
                                    </Link>

                                    <Link to='/Reports' className="linkDecor" >
                                        <li className="sidebarListItem">
                                            <ErrorOutline className="sideBarIcons" />  Reports
                                        </li>
                                    </Link>

                                </ul>
                            </div>
                        )
                    }
                  
                </div>
            </div>
        
    }


    return (
        <div>{sideBar}</div>
       
           
        
        
    
    )
}
