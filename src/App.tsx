import "./App.css";
import { ThemeProvider } from "./components";
import TestMenu from "./tests/TestMenu";
import { DefaultTheme } from "./themes";

function App() {
	return (
		<div>
			<ThemeProvider theme={DefaultTheme}>
				<TestMenu />
			</ThemeProvider>
		</div>
	);
}

export default App;
