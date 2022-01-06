import React, { useEffect } from 'react';
import "./WidgetSmall.css";
import {VisibilityTwoTone} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import LoadingBox from '../loadingbox/LoadingBox';
import MessageBox from '../messagebox/MessageBox';
import {useDispatch, useSelector} from "react-redux"
import { listCustomers } from '../../actions/customerActions';



export default function WidgetSmall() {
    const dispatch= useDispatch();
    const customerList= useSelector((state) => state.customerList);
    const {loading, error, customers}= customerList


    useEffect(()=>{
        dispatch(listCustomers());
    },[dispatch]);

    return (
        <>
            {
                loading? <div className="customerPage">
                            <div className='LoadingBoxcustomerPage'>
                                <LoadingBox ></LoadingBox>
                            </div>
                        </div>
                :
                error?  <div className="customerPage">
                            <div className="MessageBoxcustomerPage">
                                <MessageBox  variant='danger'> {error}</MessageBox>
                            </div>
                        </div>
                :
                <div className="widgetSl">
                <span className="widgSmTitle">New Customers</span>
                <ul className="widgSmList">
                        {customers.slice(0, 5).map((customers)=>(
                            <il className="widgSmListItems">
                                <Link to={"/Customer/"+customers._id}>
                                    <img src={customers.AVATER} alt="userImg" className="widgSmItemsImg" />
                                </Link>
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{customers.FullName}</span>
                                    <span className="widgetSmUserTitle">{customers.Position}</span>
                                </div>
                                <Link to={"/Customer/"+customers._id}>
                                    <button className="widgetSmButton">
                                        <VisibilityTwoTone className="widgetSmButtonIcon"/>Display
                                    </button>
                                </Link>
                            </il>
                        ))}

                </ul>
            </div>
            }
            
        </>
    )
}
