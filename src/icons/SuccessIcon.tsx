import React from "react";
import BaseSvg, { PhoenixIconProps } from "./BaseSvg/BaseSvg";

export const SuccessFillIcon = (props: PhoenixIconProps) => {
	return (
		<BaseSvg {...props}>
			<path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
		</BaseSvg>
	);
};

export const SuccessOutLineIcon = (props: PhoenixIconProps) => {
	return (
		<BaseSvg {...props}>
			<path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
		</BaseSvg>
	);
};
