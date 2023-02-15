import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import "../Style/ScoreChart.css";
import PropTypes from "prop-types";

export default function ScoreChart({ currentUserScore }) {
   function formatScore(data) {
      if (data?.todayScore) {
         data.score = data.todayScore;
         delete data.todayScore;
         return data;
      }
   }
   formatScore(currentUserScore);

   function calculatePercent(data) {
      const score = Number(data?.score);

      return Math.round(score * 100);
   }
   const scorePercent = calculatePercent(currentUserScore);
   return (
      <div className="radialChart">
         <h5 className="radialChart-title">Score</h5>
         <h6 className="radialChart-item">
            <span>{scorePercent}%</span> <br />
            de votre objectif
         </h6>
         <RadialBarChart
            width={220}
            height={224}
            data={formatScore(currentUserScore)}
            style={{ backgroundColor: "#FBFBFB", borderRadius: "5px" }}
            innerRadius="90%"
            outerRadius={140}
            barSize={10}
            startAngle={180}
            endAngle={-180}
         >
            <circle cx="50%" cy="50%" fill="white" r="75"></circle>
            <RadialBar
               minAngle={15}
               dataKey="score"
               fill="#FBFBFB"
               cornerRadius={25}
               barSize={10}
            />
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
         </RadialBarChart>
      </div>
   );
}
ScoreChart.propTypes = {
   currentUserScore: PropTypes.object,
};
