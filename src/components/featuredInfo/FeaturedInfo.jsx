import React from 'react'
import {KeyboardArrowDown,KeyboardArrowUp} from '@material-ui/icons';
import './FeaturedInfo.css'

export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featureIteam">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5637TL</span>
                    <span className="featuredMoneyRate">
                        -11.8 <KeyboardArrowDown className='arrowRate-'/>  
                    </span>
                </div>
                <span className="featuredSub">In relation to last month</span>
            </div>

            <div className="featureIteam">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">12307TL</span>
                    <span className="featuredMoneyRate">
                        -1.8 <KeyboardArrowDown className='arrowRate-'/>  
                    </span>
                </div>
                <span className="featuredSub">In relation to last month</span>
            </div>

            <div className="featureIteam">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5637TL</span>
                    <span className="featuredMoneyRate">
                        +23.8 <KeyboardArrowUp className='arrowRate'/>  
                    </span>
                </div>
                <span className="featuredSub">In relation to last month</span>
            </div>
            
        </div>
    )
}
