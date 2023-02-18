import React from "react";
import "../Style/AverageSessions.css";
import { CartesianGrid, Area, XAxis, YAxis, Tooltip, AreaChart, Rectangle } from "recharts";
import PropTypes from "prop-types";

export default function AverageSessions({ currentUserAverageSessions }) {
   /**
    * Format XAxis ticks
    * @param {Number} day - day of the week
    * @returns corresponding letter of the day
    */
   const xAxisFormatter = (day) => {
      switch (day) {
         case 1:
            return "L";
         case 2:
            return "M";
         case 3:
            return "M";
         case 4:
            return "J";
         case 5:
            return "V";
         case 6:
            return "S";
         case 7:
            return "D";
         default:
            return "";
      }
   };

   return (
      <div className="sessionDurationWrap">
         <h2>Durée moyenne des sessions</h2>

         <AreaChart
            width={250}
            height={200}
            data={currentUserAverageSessions?.sessions}
            margin={{
               top: 10,
               right: 8,
               left: 8,
               bottom: 50,
            }}
         >
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis
               dataKey="day"
               tickFormatter={xAxisFormatter}
               fontSize="12px"
               stroke="rgba(255,255,255,0.7"
               padding={{ right: 10, left: 10 }}
               tickLine={false}
               axisLine={false}
            />
            <YAxis hide={true} domain={["dataMin", "dataMax+20"]} />
            <Tooltip
               content={<CustomTooltip />}
               cursor={<CustomCursor />}
               wrapperStyle={{
                  fontSize: "12px",
                  textAlign: "center",
                  backgroundColor: "#FFFFFF",
                  padding: "0px 5px 15px",
                  width: "39px",
                  height: "25px",
               }}
            />
            <Area
               type="monotone"
               dataKey="sessionLength"
               stroke="#FFF"
               fill="rgba(255, 255, 255, 0.15)"
            />
         </AreaChart>
      </div>
   );
}

/**
 * Format Tooltip
 * @param {array} payload - source data
 * @param {boolean} active - is Tootip active
 * @returns the value when a dot on the line is pointed
 */
const CustomTooltip = ({ active, payload }) => {
   if (active && payload && payload.length) {
      return (
         <div className="custom-tooltip">
            <p>{`${payload[0].payload.sessionLength}`} min</p>
         </div>
      );
   }
   return null;
};

/**
 * function allowing  display and customization of the decorative rectangle when hovering over the graph
 * @param {points}- dot pointed in the graph
 * @returns rectangle from the pointed dot
 */
const CustomCursor = ({ points, width, height }) => {
   const { x, y } = points[0];
   return (
      <Rectangle
         fill="rgba(0, 0, 0, 0.2)"
         margin="10px"
         x={x}
         y={y}
         width={width}
         height={height}
      />
   );
};
AverageSessions.propTypes = {
   currentUserAverageSessions: PropTypes.object,
};
