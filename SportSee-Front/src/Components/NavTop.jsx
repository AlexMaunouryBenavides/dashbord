import Logo from "../Assets/logo.png";
import "../Style/NavTop.css";
import { NavLink } from "react-router-dom";

function NavTop() {
   return (
      <nav className="nav-top">
         <img src={Logo} alt="logo" />
         <ul className="nav-items">
            <NavLink to={`/`}>
               <li>Accueil</li>
            </NavLink>
            <li>Profil</li>
            <li>Réglage</li>
            <li>Communauté</li>
         </ul>
      </nav>
   );
}
export default NavTop;
