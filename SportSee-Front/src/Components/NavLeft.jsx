import "../Style/NavLeft.css";
import Yoga from "../Assets/yoga.png";
import Swim from "../Assets/swim.png";
import Bike from "../Assets/bike.png";
import Muscu from "../Assets/muscu.png";

function NavLeft() {
   return (
      <nav className="nav-left">
         <ul className="nav-img">
            <li>
               <img src={Yoga} alt="yoga" />
            </li>
            <li>
               <img src={Swim} alt="Swim" />
            </li>
            <li>
               <img src={Bike} alt="Bike" />
            </li>
            <li>
               <img src={Muscu} alt="Muscu" />
            </li>
         </ul>
         <p>Copiryght, SportSee 2020</p>
      </nav>
   );
}
export default NavLeft;
