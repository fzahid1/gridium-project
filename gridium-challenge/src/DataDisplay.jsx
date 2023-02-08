import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import './DataDisplayStyles.css'
import 'rsuite-table/dist/css/rsuite-table.css'; 

function DataDisplay() {

    const [meterData, setmeterData] = useState([]);
    const [serviceData, setServiceData] = useState([]);

    const metersURL = 'https://snapmeter.com/api/public/meters/2080448990211/readings?start=2022-08-01&end=2023-02-01';
    const serviceURL = 'https://snapmeter.com/api/public/services/2080448990210/bills?start=2022-01-01&end=2023-02-01';

    //Using proxy due to CORS errors
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

        setmeterData(data);
        setServiceData(servicedata);


    }

    useEffect(() => {
        getData()
      }, []
      
    );

    return (
        <div className='container'>
                <div className='top'>
                    <LineChart
                        width={1200}
                        height={300}
                        data={meterData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="kW" stroke="#8884d8" />
                    </LineChart>
                </div>
                <div >
                    <Table 
                        data={serviceData} 
                        height={300}
                        bordered={true}
                        cellBordered={true}
                        hover={true}>
                        <Column width={100} sortable fixed resizable>
                            <HeaderCell>Start Date</HeaderCell>
                            <Cell dataKey="start" />
                        </Column>

                        <Column width={100} sortable resizable>
                            <HeaderCell>End Date</HeaderCell>
                            <Cell dataKey="end" />
                        </Column>

                        <Column width={100} sortable resizable>
                            <HeaderCell>Cost</HeaderCell>
                            <Cell dataKey="cost"/>
                        </Column>

                        <Column width={100} resizable>
                            <HeaderCell>tndCost</HeaderCell>
                            <Cell dataKey="tndCost" />
                        </Column>

                        <Column width={100} resizable>
                            <HeaderCell>genCost</HeaderCell>
                            <Cell dataKey="genCost" />
                        </Column>

                        <Column width={100} resizable>
                            <HeaderCell>Use &#40;kW&#41;</HeaderCell>
                            <Cell dataKey="use" />
                        </Column>

                        <Column width={100} resizable>
                            <HeaderCell>Demand &#40;kW&#41;</HeaderCell>
                            <Cell dataKey="demand" />
                        </Column>

                        <Column width={100} resizable>
                            <HeaderCell>Tariff</HeaderCell>
                            <Cell dataKey="tariff" />
                        </Column>
                    </Table>
                </div>
        </div>
);

} export default DataDisplay;