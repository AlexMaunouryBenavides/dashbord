import React from "react";
import "../Style/PerfChart.css";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

export default function PerformanceChart({ currentUserPerf }) {
   /**
    * Format XAxis ticks in french
    * @param {string} kind - english labels
    * @returns french labels
    */
   const xAxisFormatter = (kind) => {
      switch (kind) {
         case 1:
            return "Cardio";
         case 2:
            return "Energie";
         case 3:
            return "Endurance";
         case 4:
            return "Force";
         case 5:
            return "Vitesse";
         case 6:
            return "Intensité";
         default:
            return null;
      }
   };

   /**
    * Format array in reverse order
    * @param {array} array
    * @returns reversed array
    */
   function reverseData(array) {
      const dataReversedArray = [];
      for (let i = array?.length - 1; i >= 0; i--) {
         dataReversedArray.push(array[i]);
      }
      return dataReversedArray;
   }
   const dataReversed = reverseData(currentUserPerf?.data);
   return (
      <div className="perf-wrapper">
         <RadarChart width={250} height={210} data={dataReversed}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
               dataKey="kind"
               tickLine={false}
               tick={{ fontSize: 12, fontWeight: 500 }}
               stroke="#fff"
               tickFormatter={xAxisFormatter}
            />

            <Radar dataKey="value" fill="#FF0101B2" />
         </RadarChart>
      </div>
   );
}
PerformanceChart.propTypes = {
   currentUserPerf: PropTypes.object,
};
