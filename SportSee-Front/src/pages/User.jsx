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
import Calorie from "../Assets/calories-icon.png";
import Proteine from "../Assets/protein-icon.png";
import Glucide from "../Assets/carbs-icon.png";
import Lipide from "../Assets/fat-icon.png";
import {
   USER_MAIN_DATA,
   USER_ACTIVITY,
   USER_AVERAGE_SESSIONS,
   USER_PERFORMANCE,
} from "../datas/dataMock";
import Nutriment from "../Components/Nutriments";

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
   const { data: InfoUser, error: InfoError } = useFetch(`http://localhost:3000/user/${userId}`);
   const apiName = InfoUser?.data?.userInfos?.firstName;
   const apiCalorie = InfoUser?.data?.keyData.calorieCount;
   const apiProteine = InfoUser?.data?.keyData.proteinCount;
   const apiGlucide = InfoUser?.data?.keyData.carbohydrateCount;
   const apiLipide = InfoUser?.data?.keyData.lipidCount;

   /**
    * Activity data
    */

   const { data: userActivity, loading: activityLoading } = useFetch(
      `http://localhost:3000/user/${userId}/activity`
   );
   const activityApi = userActivity?.data;

   /**
    * Average sessions data
    */

   const { data: AverageSessionsData } = useFetch(
      `http://localhost:3000/user/${userId}/average-sessions`
   );
   const averageApi = AverageSessionsData?.data;

   /**
    * Performance data
    */

   const { data: perfData } = useFetch(`http://localhost:3000/user/${userId}/performance`);
   const perfApi = perfData?.data;

   if (!InfoError) {
      return (
         <div>
            <NavTop />
            <div className="main-container">
               <NavLeft />
               <div className="dash-container">
                  <div className="aside">
                     <Nutriment image={Calorie} element={apiCalorie} />
                     <Nutriment image={Proteine} element={apiProteine} />
                     <Nutriment image={Glucide} element={apiGlucide} />
                     <Nutriment image={Lipide} element={apiLipide} />
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
