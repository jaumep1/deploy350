/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer,
} from 'recharts';

function SupplyDataLine({ dataLine }) {
  return (
    <>
      <div className="opacity-0 h-0">chart</div>
      <ResponsiveContainer data-testid="supplydatalinetest" width="99%">
        <LineChart
          width={window.innerWidth}
          height={100}
          data={dataLine}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default SupplyDataLine;
