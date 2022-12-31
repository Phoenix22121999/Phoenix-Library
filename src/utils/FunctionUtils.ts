import { DragEvent } from "@src/types";

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
