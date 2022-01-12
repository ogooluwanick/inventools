import React from 'react'
import "./Reports.css"
import ExportProducts from './ExportProducts';
import ExportCustomers from './ExportCustomers';
import ExportUser from './ExportUser';
import { useSelector } from 'react-redux';
import ExportVendors from './ExportVendors';
import ExportCustomersSaleData from './ExportCustomersSaleData';
import ExportReturns from './ExportReturns';
import ImportVendors from './ImportVendors';
import ImportUsers from './ImportUsers';
import ImportProducts from './ImportProducts';
import ImportCustomers from './ImportCustomers';
import ImportCustomersSaleData from './ImportCustomersSaleData';
import ImportReturns from './ImportReturns';


export const Reports = () => {
    const userSignin = useSelector((state)=>state.userSignin);
    const {userInfo} = userSignin;

    return (
        <div className='UserLogin' id='UserLogin'>
            <div className="reportSection">
                <div className="reportImports">
                    <h2 className='reportHeader'>Imports</h2>
                    
                    {userInfo && userInfo.isAdmin &&(<ImportUsers/>)}
                    <ImportProducts/>
                    <ImportCustomers/>
                    <ImportCustomersSaleData/>
                    <ImportVendors/>
                    <ImportReturns/>
                </div>
                <div className="reportExports" style={{marginLeft:"50px"}}>
                    <h2 className='reportHeader'>Exports</h2>
                    {userInfo && userInfo.isAdmin &&(<ExportUser/>)}
                    <ExportProducts/>
                    <ExportCustomers/>
                    <ExportCustomersSaleData/>
                    <ExportVendors/>
                    <ExportReturns/>

                </div>
                
            </div >
        </div>
    )
}

export default Reports