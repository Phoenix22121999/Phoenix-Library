import React from "react";
import BaseSvg, { PhoenixIconProps } from "./BaseSvg/BaseSvg";

export const CloseIcon = (props: PhoenixIconProps) => {
	return (
		<BaseSvg {...props}>
			<path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" />
		</BaseSvg>
	);
};
