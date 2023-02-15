import { NavLink } from "react-router-dom";
import useFetch from "../utils/fetchData";
import "../Style/LoginPage.css";
import { USER_ACTIVITY, USER_MAIN_DATA } from "../datas/dataMock";

const LoginPage = () => {
   return (
      <main className="login-container">
         <h2>Bienvenue sur SportSee</h2>
         <p>Selectioner un utilisateur</p>
         <ul className="users-list">
            {USER_MAIN_DATA.map((user) => (
               <li key={user.id}>
                  <NavLink to={`user/${user.id}`}>{user.userInfos.firstName}</NavLink>
               </li>
            ))}
         </ul>
      </main>
   );
};
export default LoginPage;
