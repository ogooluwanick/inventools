import React, {Component} from 'react'
import {CSVLink} from "react-csv"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import exportFromJSON from "export-from-json";


class  ExportVendors extends Component {
    constructor(props){ 
        super(props);
        this.state={
            data:[],
            loading:false
        }
        this.CSVLinkEle=React.createRef();
        this.CSVLinkEle2=React.createRef();
        this.headers=[
            {label:"Username", key: "id"},
            {label:"Primary Contact ", key: "Primary_Contact"},
            {label:"Company NAME", key: "company_NAME"},
            {label:"Phone No", key: "phone_No"},
            {label:"Website", key: "Website"},
            {label:"AVATER", key: "company_AVATER"},
            {label:"Shipping Address", key: "Shipping_Address"},     
            {label:"Billing Address", key: "BILLING_Address"},
            {label:"Status", key: "STATUS"},
        ];
    } 

    getVendorsData=()=>{
        return fetch ("https://inventools.herokuapp.com/api/vendors").then(res=>res.json())

    }
    downloadReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getVendorsData(); 
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                this.CSVLinkEle.current.link.click();
            })
        })

    }

    downloadXMLReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getVendorsData(); 
        let exportType = 'xml';
        let filename='Vendors Exports'
        let  fieldsAsStrings = [
            "Username",
            "Primary Contact",
            "Company NAME",
            "Phone No",
            "Website",
            "AVATER",
            "Shipping Address",
            "Billing Address",
            "Status",]
        
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                exportFromJSON({data, filename, fieldsAsStrings, exportType})
            })
        })

    }


    render(){
        const {data,loading }=this.state
    return (
        <div className='reportBtnStylSpace'>
            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        type="button"
                        value="Vendors XML Exports"
                        onClick={this.downloadXMLReports}
                        disabled={loading}
                        data={data}
                        filename='Vendors Exports'
                        style={{marginRight:"50px"}}
                        
                    />
                )
            }
               

              



            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        id='exportImportLinksRight'
                        type="button"
                        value="Vendors CSV Exports"
                        onClick={this.downloadReports}
                        disabled={loading}
                    />
                )
            }
            
                <CSVLink
                        hidden 
                         headers={this.headers}
                         className='exportImportLinks'
                         data={data}
                         filename='Vendors Exports'
                         ref={this.CSVLinkEle}
                         
                         
                >Vendors CSV Exports </CSVLink>
        </div>
    )
    }
}


export default ExportVendors;