import React, { RefObject } from "react";
import { Id, ToastOptionType, ToastType } from "../../../types/Toast/type";
import "./ToastItem.scss";
import { ContainerPositionType } from "../../../types/Toast/type";
import ToastProgessBar from "./../ToastProgessBar/ToastProgessBar";
import classNames from "classnames";
import { ErrorFillIcon } from "@src/icons/ErrorIcon";
import {
	CloseIcon,
	InfoFillIcon,
	NotificationFillIcon,
	SuccessFillIcon,
	WarningFillIcon,
} from "@src/icons";
import { useToast } from "@src/hooks/Toast/useToast";
import { LoadingIconActive } from "./../../../icons/LoadingIcon";
export interface ToastItemProps extends Required<ToastOptionType> {
	content: React.ReactNode;
	id: Id;
	type: ToastType;
	nodeRef: RefObject<HTMLDivElement>;
	isCloseOnClick: boolean;
	onClose: () => void;
	position: ContainerPositionType;
	isAutoClose: boolean;
	closeDelay: number;
	isPauseOnHover: boolean;
}

const ICON_LIST: { [key in ToastType]: React.ReactNode } = {
	default: <NotificationFillIcon size="medium" />,
	error: <ErrorFillIcon size="medium" />,
	info: <InfoFillIcon size="medium" />,
	success: <SuccessFillIcon size="medium" />,
	warning: <WarningFillIcon size="medium" />,
};

const ToastItem = (props: ToastItemProps) => {
	const {
		content,
		nodeRef,
		type = "default",
		onClose,
		isAutoClose,
		closeDelay,
		isPauseOnHover,
		theme,
		updatedId,
		isLoading,
	} = props;
	const { eventHandlers, isCloseByDrag, isFocusLoss } = useToast(props);

	return (
		<div
			className={classNames(
				"phoenix-toast-item-warpper",
				`phoenix-toast-item-warpper-${type}`,
				`phoenix-toast-item-warpper-${theme}`,
				{
					"pause-on-hover": isPauseOnHover,
					"close-by-drag": isCloseByDrag,
					"pause-on-focus-loss": isFocusLoss,
				}
			)}
			ref={nodeRef}
			{...eventHandlers}
			// onMouseDown={onMouse}
			// onClick={handleClick}
		>
			<div className={"phoenix-toast-item-inner"}>
				<div className="phoenix-toast-item-icon">
					{isLoading ? (
						<LoadingIconActive size="medium" />
					) : (
						ICON_LIST[type]
					)}
				</div>
				<div className="phoenix-toast-item-content">{content}</div>
			</div>
			<div className="close-button" onClick={onClose}>
				<CloseIcon size="small" />
			</div>
			{isAutoClose && !isLoading && (
				<ToastProgessBar
					key={updatedId}
					onClose={onClose}
					isAutoClose={isAutoClose}
					closeDelay={closeDelay}
				/>
			)}
		</div>
	);
};

export default ToastItem;
