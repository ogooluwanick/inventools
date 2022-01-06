import React, { useEffect } from 'react'
import "./Vendor.css"
import { Link } from 'react-router-dom'
import { GetApp} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';
import { detailsVendors } from '../../actions/vendorActions';
import Chart from '../../components/chart/Chart';




export default function Bills() {
    const dispatch =useDispatch();
    const { VendorId } = useParams()
    const vendorDetails =useSelector((state) => state.vendorDetails);
    const { loading, error, vendors}= vendorDetails

    


    useEffect(()=>{
        dispatch(detailsVendors(VendorId));
    },[dispatch,VendorId]);


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
                <div className="vendorPage"  key={vendors.id}>
                    <div className="vendorTitleContainer">
                        <h1 className="vendorTitle">Edit Vendor</h1>
                        <Link to="/NewVendor">
                            <button className="vendorAddBtn" onClick>Create</button>
                        </Link>
                    </div>

                    <div className="vendorTop">
                        <div className="vendorTopLeft">
                            <Chart data={vendors.vendorDetailsInfo} title="Sales Perfromance" dataKey='month'  />
                        </div>
                        <div className="vendorTopRight">
                            <div className="vendorInfoTop">
                                <img src={vendors.company_AVATER} alt="vendor Img" className='PImg'  />
                                <span className="vendorName">{vendors.company_NAME}</span>
                            </div>
                            <div className="vendorInfoBottom">

                                <div class="vendorInfoBottomRow">
                                    <div class="vendorInfoBottomRowColumn">
                                        <div className="vendorInfoKey">ID:       </div>
                                        <div className="vendorInfoKey">Primary_Contact:    </div>
                                        <div className="vendorInfoKey"> Phone_No:   </div>
                                        <div className="vendorInfoKey">STATUS:  </div>
                                        
                                    </div>
                                    <div class="vendorInfoBottomRowColumn" >
                                        <div className="vendorInfoValue">{vendors.id}     </div>
                                        <div className="vendorInfoValue">{vendors.Primary_Contact}     </div>
                                        <div className="vendorInfoValue">+{vendors.phone_No}     </div>
                                        <div className="vendorInfoValue">{vendors.STATUS}     </div>
                                    </div>
                                </div>

                                <div class="vendorInfoBottomRow" style={{marginLeft:'30px'}}>
                                    <div class="vendorInfoBottomRowColumn">
                                        <div className="vendorInfoKey">Company_EMAIL:       </div>
                                        <div className="vendorInfoKey">Website:    </div>
                                        <div className="vendorInfoKey"> Shipping_Address:   </div>
                                        <div className="vendorInfoKey">BILLING_Address:  </div>
                                        
                                    </div>
                                    <div class="vendorInfoBottomRowColumn" >
                                        <div className="vendorInfoValue">{vendors.company_EMAIL}     </div>
                                        <a href={vendors.Website} target="_blank" style={{color:'black'}} rel="noopener noreferrer">
                                            <div className="vendorInfoValue">{vendors.Website.slice(0, 35) }    </div>
                                        </a>
                                        <div className="vendorInfoValue">{vendors.Shipping_Address}     </div>
                                        <div className="vendorInfoValue">{vendors.BILLING_Address}     </div>
                                    </div>
                                </div>

                                
                                
                                


                            </div>
                        </div>
                    </div>

                    <div className="vendorBottom">
                        <span className="customerUpdateTitle">Edit</span>
                        <form action=""  className='vendorForm'>
                            <div className="vendorFormLeft">
                                <label htmlFor="">Vendor Name</label>
                                <input type="text" placeholder={vendors.company_NAME}/>
                                <label htmlFor="">Vendor Username</label>
                                <input type="text" placeholder={vendors.id}/>
                                <label htmlFor="">Email</label>
                                <input type="email"  placeholder={vendors.company_EMAIL}/>
                                
                                <label htmlFor="">Status</label>
                                <select name="status" id="status" className="newTransactionSelect" >
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                                <label htmlFor="">Primary Contact</label>
                                <input type="text"  placeholder={vendors.Primary_Contact}/>
                                <label htmlFor="">Phone Number</label>
                                <input type="number"  placeholder={vendors.phone_No}/>
                                <label htmlFor="">Website</label>
                                <input type="text"  placeholder={vendors.Website}/>
                                <label htmlFor="">Shipping Address</label>
                                <input type="text"  placeholder={vendors.Shipping_Address}/>
                                <label htmlFor="">Billing Address</label>
                                <input type="text"  placeholder={vendors.BILLING_Address}/>

                                
                            </div>
                            <div className="vendorFormRight">
                                <div className="vendorUpload">
                                    <img src={vendors.company_AVATER} alt="vendor Img" className="vendorImgUpload" />
                                    <label For="file"><GetApp/> </label>
                                    <input type="file" id="file" style={{display:"none"}}/>

                                </div>
                                <button className="customerUpdateBtn">Update</button>                    
                            </div>
                            
                        </form>

                    </div>
                
                
                </div>
                
            }
        </>
        
    )
}
