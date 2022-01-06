import './Customer.css'
import React, { useEffect  } from 'react'
import {PersonOutlineTwoTone,EventTwoTone,LocationOnTwoTone,MailTwoTone,PhoneAndroidTwoTone,LocationCityTwoTone,FingerprintTwoTone,BackupTwoTone} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { detailsCustomers } from '../../actions/customerActions';
import {useParams} from 'react-router-dom'



export default function Customer(props) {
    const dispatch =useDispatch();
    const { CustomerId } = useParams()
    const customerDetails =useSelector((state) => state.customerDetails);
    const { loading, error, customers}= customerDetails

    
 
    useEffect(()=> {
        dispatch(detailsCustomers(CustomerId));
    },[dispatch,CustomerId]);

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
                <div className="customerPage">
                    <div className="customerTitleContainer">
                        <h1 className="customerTitle">Edit Customer</h1>
                        <Link to="/NewCustomer" >
                            <button className="customerAddBtn" onClick>Create</button>
                        </Link>
                    </div>

                    <div className="customerContainer">
                        <div className="customerShow" key={customers._id}>
                            <div className="customerShowTop">
                                <img src={customers.AVATER} alt="cust Img" className="customerShowImg" /> 
                                <div className="customerShowTopTitle">
                                    <span className="customerUsername">{customers.FullName}</span>
                                    <span className="customerUserTitle">{customers.Position}</span>
                                </div>
                            </div>
                            <div className="customerShowBottom">
                                <span className="customerShowTitle">Account Details</span>
                                <div className="displayEachInfo">
                                    <PersonOutlineTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers.USERNAME}</span>   
                                </div>
                                <div className="displayEachInfo">
                                    <FingerprintTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers._id}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <EventTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers.DOB}</span>
                                </div>
                                <span className="customerShowTitle">Contact Details</span>
                                <div className="displayEachInfo">
                                    <PhoneAndroidTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers.Phone_No}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <MailTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers.EMAIL}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <LocationOnTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers.Address}</span>
                                </div>
                                <div className="displayEachInfo">
                                    <LocationCityTwoTone className="customerShowTitleIcon"/>
                                    <span className="customerShowInfoTitle">{customers.Company}</span>
                                </div>
                            </div>
                            


                        </div>
                    

                        
                        <div className="customerUpdate">
                            <span className="customerUpdateTitle">Edit</span>
                            <form action="" className="customerUpdateForm">
                                <div className="customerUpdateLeft">
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Username</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.USERNAME}
                                            />
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.FullName}/>
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Customer ID</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            value={customers._id}
                                            placeholder={customers._id}/>
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Date of Date</label>
                                        <input 
                                            type="date" 
                                            className="customerUpdateInputs"
                                            placeholder=""
                                            />
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Email</label>
                                        <input 
                                            type="email" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.EMAIL}/>
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Phone No</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.Phone_No}/>
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Address</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.Address}/>
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Company</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.Company}/>
                                    </div>
                                    <div className="customerUpdateItem">
                                        <label htmlFor="">Position</label>
                                        <input 
                                            type="text" 
                                            className="customerUpdateInputs"
                                            placeholder={customers.Position}/>
                                    </div>
                                </div>
                                <div className="customerUpdateRight">
                                    <div className="customerUpdateImgUpload">
                                        <img src={customers.AVATER} alt="Upload IMG" className="customerUpdateNewImgUpload" />
                                        <label htmlFor="customerImgUploadFile"><BackupTwoTone style={{cursor:'pointer'}}/></label>
                                        <input type="file" id="customerImgUploadFile"/>
                                    </div>
                                    <button className="customerUpdateBtn">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>


                    
                </div>
            }
        </>
    )
}

