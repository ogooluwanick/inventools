import React from 'react'
import LoadingBox from '../../components/loadingbox/LoadingBox';
import FlatfileImporter from "flatfile-csv-importer";
import { useSelector } from 'react-redux';

FlatfileImporter.setVersion(2)


export default function ImportCustomersSaleData() {
    
    
    
    
        const userSignin = useSelector((state)=>state.userSignin);
        const {userInfo} = userSignin;

        const  license= 'af7b8fac-6f6f-4379-989a-728352e5c14a'
        const flatfileConfig={
            type:"flatfile test",
            fields:[
                {label:"Username", key: "id"},
                {label:"Primary Contact ", key: "Primary_Contact"},
                {label:"Company NAME", key: "company_NAME"},
                {label:"Phone No", key: "phone_No"},
                {label:"Website", key: "Website"},
                {label:"AVATER", key: "company_AVATER"},
                {label:"Shipping Address", key: "Shipping_Address"},     
                {label:"Billing Address", key: "BILLING_Address"},
                {label:"Status", key: "STATUS"},
            ]

        }
    const importer=new FlatfileImporter(license,flatfileConfig)
        if (userInfo){importer.setCustomer({
            userId:userInfo._id
        })}
        const launchFlatfile =()=>{
            loading=true
            importer.requestDataFromUser().then(results=>{
                importer.displayLoader()
                setTimeout(()=>{
                    importer.displaySuccess("Download Complete")
                    console.log(JSON.stringify(results.validData,null,2))
                    
                },1500)
                loading=false
                fetch("https://inventools.herokuapp.com/api/customerSalesData",
                {method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify(results.validData,null,2)
                }).then(()=>{
                    window.alert("Customer Sales Data Uploaded");
                })
            })
            
        }
        let loading =false
    return (
        <div className='reportBtnStylSpace'>
            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        type="button"
                        value="Customer Saless XML"
                        onClick={launchFlatfile}
                        disabled={loading}
                        filename='Customer Saless Imports'
                        style={{marginRight:"50px"}}
                        
                    />
                )
            }
              
               

              



           
                    <input
                        className='exportImportLinks'
                        type="button"
                        value="Customer Sales CSV"
                        onClick={launchFlatfile}
                        disabled={loading}
                    />
                
              
        </div>
    )
    
}


