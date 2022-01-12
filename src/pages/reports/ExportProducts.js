import React, {Component} from 'react'
import {CSVLink} from "react-csv"
import LoadingBox from '../../components/loadingbox/LoadingBox';
import exportFromJSON from "export-from-json";


class  ExportProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            loading:false
        }
        this.CSVLinkEle=React.createRef();
        this.headers=[
            {label:"Product Name", key: "product_name"},
            {label:"Product Image", key: "product_img"},
            {label:"Sales", key: "SALES"},
            {label:"Stock", key: "STOCK"},
            {label:"Category", key: "CATEGORY"},
            {label:"Status", key: "STATUS"},
            {label:"Price", key: "PRICE"},
        ];

    
    } 

    getProuctData=()=>{
        return fetch ("https://inventools.herokuapp.com/api/products").then(res=>res.json())

    }
    downloadReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getProuctData(); 
        this.setState({data:data,loading:false},()=>{
            setTimeout(()=>{
                this.CSVLinkEle.current.link.click();
            })
        })

    }

    downloadXMLReports= async()=>{
        this.setState({loading:true, })
        const data= await this.getProuctData(); 
        let exportType = 'xml';
        let filename='Products Exports'
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
                        value="Products XML Exports"
                        onClick={this.downloadXMLReports}
                        disabled={loading}
                        data={data}
                        filename='Vendors Exports'
                        
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
                        value="Products CSV Exports"
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
                         filename='Products Exports'
                         ref={this.CSVLinkEle}
                         
                         
                >Products CSV Exports </CSVLink>
        </div>
    )
    }
}


export default ExportProducts;