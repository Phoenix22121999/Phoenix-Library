import { ThemeVariables } from "@src/types/Theme/type";
import { overrideThemeVariables } from "@src/utils/FunctionUtils";
import { useEffect } from "react";

export const useThemeProvider = (theme: ThemeVariables) => {
	useEffect(() => {
		overrideThemeVariables(theme);
	}, [theme]);
};
