import { CSSProperties, useEffect, useState } from "react";
import "./ToastProgessBar.scss";
import classnames from "classnames";
type Props = {
	onClose: () => void;
	isAutoClose: boolean;
	closeDelay: number;
};

const ToastProgessBar = ({ onClose, closeDelay, isAutoClose }: Props) => {
	const [stype, setStype] = useState<CSSProperties>({});

	const animationEnd = () => {
		onClose();
	};
	useEffect(() => {
		setStype({
			...stype,
			animationDuration: `${closeDelay}ms`,
		});
	}, [isAutoClose, closeDelay]);

	return (
		<div
			style={stype}
			className={classnames("phoenix-toast-progess-bar")}
			onAnimationEnd={animationEnd}
		></div>
	);
};

export default ToastProgessBar;
