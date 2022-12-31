import "./App.css";
import { ToastContainer } from "./components";
import "react-toastify/dist/ReactToastify.css";
import TestToast from "./tests/TestToast";

function App() {
	return (
		<div>
			{/* <Test2 /> */}
			<TestToast />
			<ToastContainer position="top-left" />
		</div>
	);
}

export default App;
