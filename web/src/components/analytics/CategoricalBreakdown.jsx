/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { COLORS, renderCustomizedLabel } from './AnalyticsUtils';

function CategoricalBreakdown({ dataDoughnut }) {
  return (
    <>
      <div id="categoricalBreakdown" className="text-lg tracking-wide font-semibold">
        Categorical Breakdown
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataDoughnut}
            cx="45%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={55}
            fill="#8884d8"
            dataKey="quantity"
          >
            {dataDoughnut?.map((entry, index) => (
              <Cell key={`cell-${dataDoughnut}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ transform: 'translate(0px, -30px)', margin: 0, padding: 0 }}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default CategoricalBreakdown;
