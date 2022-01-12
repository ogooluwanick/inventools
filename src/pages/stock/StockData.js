import React, {Component} from 'react'
import LoadingBox from '../../components/loadingbox/LoadingBox';
import Plot from 'react-plotly.js';


class  StockData extends Component {
    constructor(props){ 
        super(props);
        this.state={
            ChartXValues:[],
            ChartYValues:[],
            loading:false,
        }
    
    } 
    
    componentDidMount(){
        this.setState({loading:true, })
        this.fetchStock();

    }

    
    fetchStock=()=>{
        let pointToThis=this
        const api_Key="UYUKM9P9GEADQ1UQ"
        let stock_Sym="FB"
        let api_Call=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_Sym}&outputsize=compact&apikey=${api_Key}`
        //`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock_Sym}&interval=Daily&outputsize=compact&apikey=${api_Key}`
        // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock_Sym}&outputsize=compact&apikey=-${api_Key}
        // return fetch (api_Call).then(res=>res.json())
        let ChartXValuesFunction=[];
        let ChartYValuesFunction=[];


        fetch(api_Call).then(
            function(response){
                return response.json()
            }
        )
        .then(
            function(data){

                for(var key in data['Time Series (Daily)']){
                    ChartXValuesFunction.push(key)
                    ChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open'])
                }

                pointToThis.setState({
                    loading:false,
                    ChartXValues:ChartXValuesFunction,
                    ChartYValues:ChartYValuesFunction,
                    stock_Sym:stock_Sym
                })
                
            }
        )

    }

    
       

    render(){
        const {loading}=this.state
    return (
        <div className='stockMainBody'>
            <h1 className='reportHeader'>Stock Market</h1>
            <div className='stockChart'>
                {
                    loading?
                    (<LoadingBox></LoadingBox>):
                    (
                        <div className='PlotStockChart'>
                            <Plot 
                                data={[
                                    {
                                    x: this.state.ChartXValues,
                                    y: this.state.ChartYValues,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: 'red'},
                                    }
                                ]}
                                layout={{width: 1000, height: 450, title: this.state.stock_Sym+" Stocks" }}
                            />
                            
                        </div>
                            
                    )
                }
             </div>
            
        </div>
    )
    }
}


export default StockData;