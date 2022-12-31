import BaseSvg, { PhoenixIconProps } from "./BaseSvg/BaseSvg";

export const LoadingIcon = (props: PhoenixIconProps) => {
	return (
		<BaseSvg {...props}>
			<path d="M12 4V2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12H4C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4V4Z" />
		</BaseSvg>
	);
};
export const LoadingIconActive = (props: PhoenixIconProps) => {
	return (
		<div className="phoenix-icon-loading">
			<BaseSvg {...props}>
				<path d="M12 4V2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12H4C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4V4Z" />
			</BaseSvg>
		</div>
	);
};
