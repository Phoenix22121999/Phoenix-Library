import { DragEvent } from "@src/types";
import { ThemeVariableKeys, ThemeVariables } from "@src/types/Theme/type";

export const uuid = () => {
	return crypto.randomUUID();
};

export function getX(e: DragEvent) {
	return e.targetTouches && e.targetTouches.length >= 1
		? e.targetTouches[0].clientX
		: e.clientX;
}

export function getY(e: DragEvent) {
	return e.targetTouches && e.targetTouches.length >= 1
		? e.targetTouches[0].clientY
		: e.clientY;
}

export const isFn = (v: any): v is Function => typeof v === "function";

export const isStr = (v: any): v is String => typeof v === "string";

export const setCSSVariable = (
	element: HTMLElement | null,
	variable: string,
	value: string
) => {
	if (element && value) {
		element.style.setProperty(variable, String(value));
	}
};

export const overrideThemeVariables = (themeObject: ThemeVariables) => {
	const root = document.getElementById("root");
	const themeVariables = Object.keys(themeObject);
	if (root && themeObject) {
		themeVariables.forEach((themeVar) => {
			const varValue = themeObject[themeVar as ThemeVariableKeys];
			if (varValue) {
				setCSSVariable(root, `--${themeVar}`, varValue);
			}
		});
	}
};
