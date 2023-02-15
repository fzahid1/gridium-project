import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'; 
import './DataDisplayStyles.css'

function DataDisplay() {

    const [data, setData] = useState([]);
    const urls = ['/meters', '/services']
    
    const getData = async () => {
        const [metersRes, serviceRes] = await Promise.all(
            urls.map((url) =>
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': '4f981c43-bf28-404c-ba22-461b5979b359' 
                    }
                }).then((res) => res.json()))            
        );
        let data = [];
        for(const time in metersRes.data[0].attributes.readings.kw) {
            if( metersRes.data[0].attributes.readings.kw[time] != null) {
                data.push({name: new Date(time).toLocaleString() , kW: metersRes.data[0].attributes.readings.kw[time]})
            }
        }

        console.log(serviceRes.data[0].attributes)
        let servicedata = [];
        for(const bill in serviceRes.data) {
            servicedata.push(serviceRes.data[bill].attributes)
        }
        console.log(servicedata);

        setData({meters: data, service: servicedata})
    }

    useEffect(() => {
        getData()
      }, []
      
    );

    return (
        <div>
            <div className='display'>
                <LineChart
                    width={1900}
                    height={600}
                    data={data.meters}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 10,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dy={10} interval={8000} dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend height={20}/>
                    <Line type="monotone" dataKey="kW" stroke="#8ed1fc" dot={false}/>
                </LineChart>
            </div>
            <div className='table'>
                <Table 
                    data={data.service} 
                    height={400}
                    bordered={true}
                    cellBordered={true}
                    hover={true}>
                    <Column align="center" width={200}>
                        <HeaderCell>Start Date</HeaderCell>
                        <Cell dataKey="start" />
                    </Column>
                    <Column align="center" width={200}>
                        <HeaderCell>End Date</HeaderCell>
                        <Cell dataKey="end" />
                    </Column>
                    <Column align="center" flexGrow={2}  >
                        <HeaderCell>Cost</HeaderCell>
                        <Cell dataKey="cost"/>
                    </Column>
                    <Column align="center" flexGrow={3} >
                        <HeaderCell>tndCost</HeaderCell>
                        <Cell dataKey="tndCost" />
                    </Column>
                    <Column align="center" flexGrow={4} >
                        <HeaderCell>genCost</HeaderCell>
                        <Cell dataKey="genCost" />
                    </Column>
                    <Column align="center" flexGrow={5}>
                        <HeaderCell>Use &#40;kW&#41;</HeaderCell>
                        <Cell dataKey="use" />
                    </Column>
                    <Column align="center" flexGrow={6}>
                        <HeaderCell>Demand &#40;kW&#41;</HeaderCell>
                        <Cell dataKey="demand" />
                    </Column>
                    <Column align="center" flexGrow={7}>
                        <HeaderCell>Tariff</HeaderCell>
                        <Cell dataKey="tariff" />
                    </Column>
                </Table>
            </div>
        </div>
);

} export default DataDisplay;