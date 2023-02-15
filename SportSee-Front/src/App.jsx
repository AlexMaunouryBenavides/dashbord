import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import User from "./pages/User";
import Error from "./pages/Error";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/user/:userId" element={<User />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
}

export default App;
