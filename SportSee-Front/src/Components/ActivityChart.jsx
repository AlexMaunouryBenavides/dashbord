import React from "react";
import "../Style/ActivityChart.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import PropTypes from "prop-types";

export default function Activity({ currentUserActivity }) {
   const formatDate = (index) => index + 1;
   return (
      <div className="activity-wrapper">
         <BarChart
            width={800}
            height={210}
            data={currentUserActivity?.sessions}
            log
            margin={{
               top: 10,
               right: 5,
               left: 5,
               bottom: 10,
            }}
         >
            <CartesianGrid
               vertical="false"
               strokeDasharray="3"
               height={1}
               horizontalPoints={[90, 185]}
            />
            <XAxis
               dataKey={currentUserActivity?.index}
               tickFormatter={formatDate}
               interval="preserveStartEnd"
               tickSize="0"
               tickMargin="25"
               stroke="#9B9EAC"
            />
            <YAxis dataKey="calories" YAxisId="left" orientation="left" hide="true" />
            <YAxis
               className="activityYAxis"
               dataKey="kilogram"
               yAxisId="right"
               orientation="right"
               type="number"
               domain={["dataMin -1", "dataMax"]}
               tickCount="3"
               tickSize="0"
               axisLine={false}
               tickMargin="30"
               width={45}
               stroke="#9B9EAC"
            />
            <Tooltip content={<CustomTooltipActivity />} />
            <Legend
               verticalAlign="top"
               align="right"
               height={80}
               iconType="circle"
               iconSize={8}
               formatter={(value, entry, index) => (
                  <span className="activityLegendColor">{value}</span>
               )}
            />{" "}
            <Bar
               name="Poids (kg)"
               dataKey="kilogram"
               fill="#282D30"
               barSize={7}
               radius={[25, 25, 0, 0]}
            />
            <Bar
               name="Calories brûlées (kCal)"
               dataKey="calories"
               fill="#E60000"
               barSize={7}
               radius={[25, 25, 0, 0]}
            />
         </BarChart>
      </div>
   );
}
Activity.propTypes = {
   currentUserActivity: PropTypes.object,
};

/**
 * Format Tooltip
 * @param {array} payload - source data
 * @param {boolean} active - is Tootip active
 * @returns data.value on hover
 */
function CustomTooltipActivity({ payload, active }) {
   if (active) {
      return (
         <div className="activityChartTooltip">
            <div>{`${payload[0]?.value}`}kg</div>
            <div>{`${payload[1]?.value}`}Kcal</div>
         </div>
      );
   }
   return null;
}
