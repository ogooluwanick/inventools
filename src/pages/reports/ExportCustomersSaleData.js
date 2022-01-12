import React, {Component} from 'react'
import {CSVLink} from "react-csv"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import exportFromJSON from "export-from-json";


class  ExportCustomersSaleData extends Component {
    constructor(props){ 
        super(props);
        this.state={
            data:[],
            loading:false
        }
        this.CSVLinkEle=React.createRef();
        this.headers=[
            {label:"Month", key: "month"},
            {label:"Active Customers ", key: "Active Customers"},
        ];

    
    } 

    getCustomerData=()=>{
        return fetch ("https://inventools.herokuapp.com/api/customerActivityData").then(res=>res.json())

    }
    downloadReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getCustomerData(); 
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                this.CSVLinkEle.current.link.click();
            })
        })

    }

    downloadXMLReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getCustomerData(); 
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
        const {data,loading}=this.state
    return (
        <div>
            {
                loading?
                (<LoadingBox></LoadingBox>):
                (
                    <input
                        className='exportImportLinks'
                        type="button"
                        value="Customers Sales XML"
                        onClick={this.downloadXMLReports}
                        disabled={loading}
                        data={data}
                        filename='Customers Sales Exports'
                        
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
                        value="Customers Sales CSV"
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
                         filename='Customers Sales Exports'
                         ref={this.CSVLinkEle}
                         
                         
                >Customers Sales CSV  </CSVLink>
        </div>
    )
    }
}


export default ExportCustomersSaleData;