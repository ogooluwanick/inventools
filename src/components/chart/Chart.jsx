import "./Chart.css"
import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';








export default function Chart({title, data,dataKey,grid}) {
    return (
        <div className="chart">
           <h3 className="chartTitle">{title}</h3> 

            <ResponsiveContainer width="100%" aspect={4/1}>
                <LineChart data={data}>
                    <XAxis dataKey={dataKey} stroke="#0c8ac1" />
                    <Line type="monotone" dataKey="Active Customers" stroke="#0c8ac1"/>
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}

                </LineChart>
            </ResponsiveContainer>
           
        </div>
    )
}
