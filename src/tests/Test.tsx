import { createContext, useContext } from "react";

const ExampleContext = createContext<{ color: string } | null>(null);

const Test = () => {
	return (
		<ExampleContext.Provider value={{ color: "red" }}>
			<div className="App">
				<ChildComponent />
			</div>
		</ExampleContext.Provider>
	);
};

const ChildComponent = () => {
	const { color } = useContext(ExampleContext)!;

	return <p style={{ color }}>This text is {color}</p>;
};

export default Test;
