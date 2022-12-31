import React from "react";
import classnames from "classnames";
import "./BaseSvg.scss";
export interface IconProps {
	size?: "small" | "medium" | "large";
}

export type PhoenixIconProps = React.SVGProps<SVGSVGElement> & IconProps;

const BaseSvg = ({ size, ...props }: PhoenixIconProps) => {
	return (
		<svg
			className={classnames("phoenix-icon-size", {
				[`phoenix-icon-size-${size}`]: size,
			})}
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="currentColor"
			{...props}
		></svg>
	);
};

export default BaseSvg;
