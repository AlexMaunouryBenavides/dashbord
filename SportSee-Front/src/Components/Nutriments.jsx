import "../Style/Nutriments.css";
import PropTypes from "prop-types";

function Nutriment({ image, element, titre }) {
   return (
      <div className="box">
         <div className="box-img-cal">
            <img src={image} alt="img-Calorie" />
         </div>
         <div className="box-text">
            <h3>{element}kCal</h3>
            <p>{titre}</p>
         </div>
      </div>
   );
}
export default Nutriment;

Nutriment.propTypes = {
   currentUserPerf: PropTypes.object,
};
