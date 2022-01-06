import React, { useEffect } from 'react'
import "./Return.css"
import { Link } from 'react-router-dom'
import {PersonOutlineTwoTone,EventTwoTone,Details,FingerprintTwoTone,BackupTwoTone,MonetizationOn,CreditCard} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { detailsReturns } from '../../actions/returnActions';




export default function Return() {
    const dispatch =useDispatch();
    const { ReturnId } = useParams()
    const returnDetails =useSelector((state) => state.returnDetails);
    const { loading, error, returns}= returnDetails

 
    useEffect(()=> {
        dispatch(detailsReturns(ReturnId));
    },[dispatch,ReturnId]);


   

   



    const StatusText=({Status})=>{
        return <span className={"productlistStatusTextColor "+ Status}>  {Status}</span>
    }
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
                <div className="returnPage">
                    <div className="returnTitleContainer">
                        <h1 className="returnTitle">Edit Return</h1>
                        <Link to="/NewReturn">
                            <button className="returnAddBtn" onClick>Create</button>
                        </Link>
                    </div>

                    <div className="returnContainer">
                        <div className="returnShow" key={returns.id}>
                            <div className="returnShowTop">
                                
                            </div>
                            <div className="returnShowBottom">
                                <span className="returnShowTitle">Return Details</span>
                                <div className="displayEachInfo">
                                    <PersonOutlineTwoTone className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">{returns.customer_NAME}</span>   
                                </div>
                                <div className="displayEachInfo">
                                    <FingerprintTwoTone className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">{returns.id}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <CreditCard className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">{returns.transactionID}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <EventTwoTone className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">{returns.date}</span>
                                </div>
                                <span className="returnShowTitle">Status Details</span>
                               
                                <div className="displayEachInfo">
                                    <Details className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">STATUS:  
                                        <StatusText Status={returns.STATUS}/> 
                                    </span>
                                </div>
                                <div className="displayEachInfo">
                                    <Details className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">RECEIVE STATUS:  
                                        <StatusText Status={returns.RECEIVE_STATUS}/> 
                                    </span>
                                </div>
                                <div className="displayEachInfo">
                                    <Details className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">REFUND STATUS: 
                                        <StatusText Status={returns.REFUND_STATUS}/> 
                                    </span>
                                </div>
                                <div className="displayEachInfo">
                                    <MonetizationOn className="returnShowTitleIcon"/>
                                    <span className="returnShowInfoTitle">AMOUNT REFUNDED: {returns.AMOUNT_REFUNDED}TL</span>
                                </div>
                            </div>
                            


                        </div>
                    

                        
                        <div className="returnUpdate">
                            <span className="returnUpdateTitle">Edit</span>
                            <form action="" className="returnUpdateForm">
                                <div className="returnUpdateLeft">
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">Return ID</label>
                                        <input 
                                            type="text" 
                                            className="returnUpdateInputs"
                                            placeholder={returns.id}/>
                                    </div>
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">Transaction ID</label>
                        
                                            <input 
                                                type="text" 
                                                className="returnUpdateInputs"
                                                placeholder={returns.transactionID}/>
                                       
                                    </div>
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">Customer Name </label>
                                        <input 
                                            type="text" 
                                            className="returnUpdateInputs"
                                            placeholder={returns.customer_NAME}/>
                                    </div>
                                    
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">Return Date</label>
                                        <input 
                                            type="date" 
                                            className="returnUpdateInputs"/>
                                    </div>
                                    
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">Status</label>
                                        <select name="status" id="active" className="newTransactionSelect">
                                            <option value="approved" >Approved</option>
                                            <option value="declined" >Declined</option>
                                            <option value="pending" >Pending</option>
                                        </select>
                                    </div>
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">RECEIVE STATUS</label>
                                        <select name="RECEIVE_STATUS" id="active" className="newTransactionSelect">
                                            <option value="approved" >Approved</option>
                                            <option value="declined" >Declined</option>
                                            <option value="pending" >Pending</option>
                                        </select>
                                    </div>
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">REFUND STATUS</label>
                                        <select name="REFUND_STATUS" id="active" className="newTransactionSelect">
                                            <option value="approved" >Approved</option>
                                            <option value="declined" >Declined</option>
                                            <option value="pending" >Pending</option>
                                        </select>
                                    </div> 
                                    <div className="returnUpdateItem">
                                        <label htmlFor="">AMOUNT REFUNDED</label>
                                        <input 
                                            type="number" 
                                            className="returnUpdateInputs"
                                            placeholder={returns.AMOUNT_REFUNDED}/>
                                    </div>
                                </div>
                                <div className="returnUpdateRight">
                                    <div className="returnUpdateImgUpload">
                                        <label htmlFor="returnImgUploadFile"><BackupTwoTone style={{cursor:'pointer'}}/></label>
                                        <input type="file" id="returnImgUploadFile"/>
                                    </div>
                                    <button className="returnUpdateBtn">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                
            }
        </>
        
    )
}
