import { Navigate } from "react-router-dom";
import NavTop from "../Components/NavTop";
import NavLeft from "../Components/NavLeft";
import "../Style/User.css";
import Activity from "../Components/ActivityChart";
import AverageSessions from "../Components/AverageSessionsChart";
import PerfChart from "../Components/PerfChart";
import ScoreChart from "../Components/ScoreChart";
import { useParams } from "react-router-dom";
import useFetch from "../utils/fetchData";
import Calorie from "../Assets/energy.svg";
import Proteine from "../Assets/chicken.svg";
import Glucide from "../Assets/apple.svg";
import Lipide from "../Assets/cheeseburger.svg";
import {
   USER_MAIN_DATA,
   USER_ACTIVITY,
   USER_AVERAGE_SESSIONS,
   USER_PERFORMANCE,
} from "../datas/dataMock";

/**
 * Get datas equal to ID from mock
 * @returns number of the user id
 */
const filterUser = (userId, arrayToFind) => {
   return arrayToFind.find((user) => {
      return Number(userId) === user.userId;
   });
};

function User() {
   const { userId } = useParams();

   /**
    *   Current user data from mock
    */
   const currentUserData = USER_MAIN_DATA.find((userData) => userData.id.toString() === userId);
   const name = currentUserData?.userInfos.firstName;
   const calorie = currentUserData?.keyData.calorieCount;
   const proteine = currentUserData?.keyData.proteinCount;
   const glucide = currentUserData?.keyData.carbohydrateCount;
   const lipide = currentUserData?.keyData.lipidCount;

   /**
    * Variables of datas from mock to create charts
    */
   const currentUserActivity = filterUser(userId, USER_ACTIVITY);
   const currentUserAverageSessions = filterUser(userId, USER_AVERAGE_SESSIONS);
   const currentUserPerf = filterUser(userId, USER_PERFORMANCE);

   /**
    * Variables of datas from API to create charts
    */

   /**
    * User data
    */
   const {
      data: InfoUser,
      loading: InfoLoading,
      error: InfoError,
   } = useFetch(`http://localhost:3000/user/${userId}`);
   const apiName = InfoUser?.data?.userInfos?.firstName;
   const apiCalorie = InfoUser?.data?.keyData.calorieCount;
   const apiProteine = InfoUser?.data?.keyData.proteinCount;
   const apiGlucide = InfoUser?.data?.keyData.carbohydrateCount;
   const apiLipide = InfoUser?.data?.keyData.lipidCount;

   /**
    * Activity data
    */
   const {
      data: user,
      loading: userLoading,
      error: userError,
   } = useFetch(`http://localhost:3000/user/${userId}`);
   const {
      data: userActivity,
      loading: activityLoading,
      error: activityError,
   } = useFetch(`http://localhost:3000/user/${userId}/activity`);
   const activityApi = userActivity?.data;

   /**
    * Average sessions data
    */

   const {
      data: AverageSessionsData,
      loading: averageSessionsLoading,
      error: averageSessionsError,
   } = useFetch(`http://localhost:3000/user/${userId}/average-sessions`);
   const averageApi = AverageSessionsData?.data;

   /**
    * Performance data
    */

   const {
      data: perfData,
      loading: perfLoading,
      error: perfError,
   } = useFetch(`http://localhost:3000/user/${userId}/performance`);
   const perfApi = perfData?.data;

   if (!InfoError) {
      return (
         <div>
            <NavTop />
            <div className="main-container">
               <NavLeft />
               <div className="dash-container">
                  <div className="aside">
                     <div className="box">
                        <div className="box-img-cal">
                           <img src={Calorie} alt="img-Calorie" />
                        </div>
                        <div className="box-text">
                           <h3>{apiCalorie}kCal</h3>
                           <p>Calories</p>
                        </div>
                     </div>
                     <div className="box">
                        <div className="box-img-prot">
                           <img src={Proteine} alt="img-Proteine" />
                        </div>
                        <div className="box-text">
                           <h3>{apiProteine}kCal</h3>
                           <p>Proteines</p>
                        </div>
                     </div>
                     <div className="box">
                        <div className="box-img-glu">
                           <img src={Glucide} alt="img-Glucide" />
                        </div>
                        <div className="box-text">
                           <h3>{apiGlucide}kCal</h3>
                           <p>Glucides</p>
                        </div>
                     </div>
                     <div className="box">
                        <div className="box-img-lip">
                           <img src={Lipide} alt="img-Lipide" />
                        </div>
                        <div className="box-text">
                           <h3>{apiLipide}kCal</h3>
                           <p>Lipides</p>
                        </div>
                     </div>
                  </div>
                  <h1>
                     Bonjour <span>{apiName}</span>
                  </h1>
                  <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                  <Activity currentUserActivity={activityApi} />
                  <div className="bottom-chart">
                     {!activityLoading && (
                        <AverageSessions currentUserAverageSessions={averageApi} />
                     )}
                     <PerfChart currentUserPerf={perfApi} />
                     <ScoreChart currentUserScore={InfoUser?.data} />
                  </div>
               </div>
            </div>
         </div>
      );
   } else {
      return <Navigate to="*" />;
   }
}
export default User;
