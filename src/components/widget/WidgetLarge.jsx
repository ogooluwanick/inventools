import React, { useEffect } from 'react'
import "./WidgetLarge.css"
import { Link } from 'react-router-dom';
import LoadingBox from "../../components/loadingbox/LoadingBox"
import MessageBox from "../../components/messagebox/MessageBox"
import { useDispatch, useSelector } from 'react-redux';
import {listTransactions} from "../../actions/transactionActions"



export default function WidgetLarge() {
    const dispatch= useDispatch();
    const transactionList= useSelector((state) => state.transactionList);
    const {loading, error, transactions}= transactionList
    
    


    useEffect(()=>{
        dispatch(listTransactions());
    },[dispatch]);



    const Button=({Status})=>{
        return <button className={"WidgetLgButton "+ Status}>{Status}</button>
    }

    return (
        
        <>
            {      loading? <div className="customerPage">
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
                    <div className="WidgetLg">
                        <span className="widgLrTitle">Recent Transactions</span>
                        <table className="WidgetLgTable">
                            <tr className="WidgetLgTr">
                                <th className="WidgetLgTh">Customer</th>
                                <th className="WidgetLgTh">Order placed</th>
                                <th className="WidgetLgTh">Order number</th>
                                <th className="WidgetLgTh">Amount</th>
                                <th className="WidgetLgTh">Status</th>
                            </tr>
                            
                            {transactions.slice(0, 5).map((transactions)=>(
                                <tr className="WidgetLgTr">
                                    <td className="WidgetLgUser">
                                        <Link to={"/Transaction/"+transactions._id}>
                                            <img src={transactions.customer_AVATER} alt="user"  className="widgetLgUserImg"/>
                                        </Link>
                                        <span className="WidgetLgUsername">{transactions.customer_NAME}</span>
                                    </td>
                                    <td className="WidgetLgOrderPlaced">{transactions.order_placed}</td>
                                    <td className="WidgetLgOrderNo">{transactions.order_NO}</td>
                                    <td className="WidgetLgAmount">{transactions.VALUE}TL</td>
                                    <Link to={"/Transaction/"+transactions._id}>
                                        <td className="WidgetLgStatus"><Button Status={transactions.STATUS}/></td>
                                    </Link>
                                </tr>
                            ))}
                        </table>
                    </div>
            }
         </>
            
    )
}
