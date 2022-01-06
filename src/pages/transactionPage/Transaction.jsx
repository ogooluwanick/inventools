import React, { useEffect } from 'react'
import "./Transaction.css"
import { Link } from 'react-router-dom'
import {PersonOutlineTwoTone,EventTwoTone,LocationOnTwoTone,FingerprintTwoTone,BackupTwoTone,EuroSymbolTwoTone} from '@material-ui/icons';
import {customerRows} from "../customerPage/customerData"
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { detailsTransactions } from '../../actions/transactionActions';




export default function Transaction() {
    const dispatch =useDispatch();
    const { TransactionId } = useParams()
    const transactionDetails =useSelector((state) => state.transactionDetails);
    const { loading, error, transactions}= transactionDetails

    
    useEffect(()=> {
        dispatch(detailsTransactions(TransactionId));
    },[dispatch,TransactionId]);

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
                <div className="transactionPage">
                    <div className="transactionTitleContainer">
                        <h1 className="transactionTitle">Edit Transaction</h1>
                        <Link to="/NewTransaction">
                            <button className="transactionAddBtn" onClick>Create</button>
                        </Link>
                    </div>

                    <div className="transactionContainer">
                        <div className="transactionShow" key={transactions._id}>
                            <div className="transactionShowTop">
                                <img src={transactions.customer_AVATER} alt="cust Img" className="transactionShowImg" /> 
                                <div className="transactionShowTopTitle">
                                    <span className="transactionUsername">{transactions.customer_NAME} </span>
                                </div>
                            </div>
                            <div className="transactionShowBottom">
                                <span className="transactionShowTitle">Transaction Details</span>
                                <div className="displayEachInfo">
                                    <PersonOutlineTwoTone className="transactionShowTitleIcon"/>
                                    <span className="transactionShowInfoTitle">{transactions.order_NO}</span>   
                                </div>
                                <div className="displayEachInfo">
                                    <FingerprintTwoTone className="transactionShowTitleIcon"/>
                                    <span className="transactionShowInfoTitle">{transactions._id}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <EventTwoTone className="transactionShowTitleIcon"/>
                                    <span className="transactionShowInfoTitle">{transactions.order_placed}</span>
                                </div>
                                <span className="transactionShowTitle">Contact Details</span>
                               
                                <div className="displayEachInfo">
                                    <LocationOnTwoTone className="transactionShowTitleIcon"/>
                                    <span className="transactionShowInfoTitle">{transactions.Shipping_Address}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <EuroSymbolTwoTone className="transactionShowTitleIcon"/>
                                    <span className="transactionShowInfoTitle">{transactions.VALUE}TL</span>
                                </div>
                            </div>
                            


                        </div>
                    

                        
                        <div className="transactionUpdate">
                            <span className="transactionUpdateTitle">Edit</span>
                            <form action="" className="transactionUpdateForm">
                                <div className="transactionUpdateLeft">
                                    <div className="transactionUpdateItem">
                                        <label htmlFor="">Customer ID</label>
                                        <select name="CustomerID" id="CustomerID" className="newTransactionSelect">
                                            {customerRows.map((customerRows)=>(
                                                <option value="" >{customerRows.USERNAME}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="transactionUpdateItem">
                                        <label htmlFor="">Order Number</label>
                                        <input 
                                            type="number" 
                                            className="transactionUpdateInputs"
                                            placeholder={transactions.order_NO}/>
                                    </div>
                                    <div className="transactionUpdateItem">
                                        <label htmlFor="">Order Date</label>
                                        <input 
                                            type="date" 
                                            className="transactionUpdateInputs"/>
                                    </div>
                                    <div className="transactionUpdateItem">
                                        <label htmlFor="">Shipping Address</label>
                                        <input 
                                            type="text" 
                                            className="transactionUpdateInputs"
                                            placeholder={transactions.Shipping_Address}/>
                                    </div>
                                    <div className="transactionUpdateItem">
                                        <label htmlFor="">Status</label>
                                        <select name="status" id="active" className="newTransactionSelect">
                                            <option value="approved" >Approved</option>
                                            <option value="declined" >Declined</option>
                                            <option value="pending" >Pending</option>
                                        </select>
                                    </div>
                                    <div className="transactionUpdateItem">
                                        <label htmlFor="">Value</label>
                                        <input 
                                            type="number" 
                                            className="transactionUpdateInputs"
                                            placeholder={transactions.VALUE}/>
                                    </div>
                                </div>
                                <div className="transactionUpdateRight">
                                    <div className="transactionUpdateImgUpload">
                                        <img src={transactions.customer_AVATER} alt="Upload IMG" className="transactionUpdateNewImgUpload" />
                                        <label htmlFor="transactionImgUploadFile"><BackupTwoTone style={{cursor:'pointer'}}/></label>
                                        <input type="file" id="transactionImgUploadFile"/>
                                    </div>
                                    <button className="transactionUpdateBtn">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                
            }
        </>
        
    )
}
