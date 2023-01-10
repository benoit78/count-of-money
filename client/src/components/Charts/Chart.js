import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts';

const Chart = ({values}) => {

  return (
    <>
       <ResponsiveContainer>
        <LineChart
        data={values}
        width={500} height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        >
          <XAxis dataKey="value" />
          <YAxis type="number" domain={['dataMin', 'dataMax']}/>
          <Line type="monotone" dataKey="value" stroke="#0d6efd" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;