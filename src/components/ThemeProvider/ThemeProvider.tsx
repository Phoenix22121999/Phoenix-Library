import { useThemeProvider } from "@src/hooks";
import { ThemeVariables } from "@src/types/Theme/type";
import "./index";
type ThemeProviderProps = {
	children: React.ReactNode;
	theme: ThemeVariables;
};
const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
	useThemeProvider(theme);
	return <div className="theme-provider">{children}</div>;
};
export default ThemeProvider;
