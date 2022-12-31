import { ToastItemProps } from "@src/components/Toast/ToastItem/ToastItem";
import { ToastDragClass } from "@src/cores/Toast/ToastDragClass";
import { DragDirection, DragEvent } from "@src/types";
import { getX, getY } from "@src/utils/FunctionUtils";
import { DOMAttributes, useEffect, useRef, useState } from "react";

export const useToast = (props: ToastItemProps) => {
	const toastDragClass = useRef(new ToastDragClass()).current;
	const [isCloseByDrag, setIsCloseByDrag] = useState(false);
	const [isFocusLoss, setIsFocusLoss] = useState(false);

	useEffect(() => {
		props.isPauseOnFocusLoss && bindFocusEvents();

		return () => {
			props.isPauseOnFocusLoss && unbindFocusEvents();
		};
	}, [props.isPauseOnFocusLoss]);

	function onDragStart(
		e:
			| React.MouseEvent<HTMLElement, MouseEvent>
			| React.TouchEvent<HTMLElement>
	) {
		if (props.isDragToClose) {
			// required for ios safari to prevent default swipe behavior
			if (e.nativeEvent.type === "touchstart")
				e.nativeEvent.preventDefault();

			bindDragEvents();

			const toast = props.nodeRef.current!;
			toastDragClass.canDrag = true;
			toastDragClass.isDrag = false;

			toastDragClass.boundingRect = toast.getBoundingClientRect();
			toast.style.transition = "";
			toastDragClass.x = getX(e.nativeEvent as DragEvent);
			toastDragClass.y = getY(e.nativeEvent as DragEvent);

			if (props.dragDirection === DragDirection.X) {
				toastDragClass.start = toastDragClass.x;
				toastDragClass.removalDistance =
					toast.offsetWidth * (props.dragThreshold / 100);
			} else {
				toastDragClass.start = toastDragClass.y;
				toastDragClass.removalDistance =
					toast.offsetHeight * (props.dragThreshold / 100);
			}
		}
	}

	function bindDragEvents() {
		document.addEventListener("mousemove", onDragMove);
		document.addEventListener("mouseup", onDragEnd);

		document.addEventListener("touchmove", onDragMove);
		document.addEventListener("touchend", onDragEnd);
	}

	function unbindDragEvents() {
		document.removeEventListener("mousemove", onDragMove);
		document.removeEventListener("mouseup", onDragEnd);

		document.removeEventListener("touchmove", onDragMove);
		document.removeEventListener("touchend", onDragEnd);
	}

	function onWindowFocus() {
		setIsFocusLoss(false);
	}

	function onWindowBlur() {
		setIsFocusLoss(true);
	}

	function bindFocusEvents() {
		if (!document.hasFocus()) onWindowBlur();

		window.addEventListener("focus", onWindowFocus);
		window.addEventListener("blur", onWindowBlur);
	}

	function unbindFocusEvents() {
		window.removeEventListener("focus", onWindowFocus);
		window.removeEventListener("blur", onWindowBlur);
	}

	function onDragMove(e: MouseEvent | TouchEvent) {
		const toast = props.nodeRef.current!;
		if (toastDragClass.canDrag && toast) {
			//   if (isRunning) pauseToast();
			toastDragClass.x = getX(e as DragEvent);
			toastDragClass.y = getY(e as DragEvent);
			if (props.dragDirection === DragDirection.X) {
				toastDragClass.delta = toastDragClass.x - toastDragClass.start;
			} else {
				toastDragClass.delta = toastDragClass.y - toastDragClass.start;
			}

			// prevent false positif during a toast click
			if (toastDragClass.start !== toastDragClass.x)
				toastDragClass.isDrag = true;
			toast.style.transform = `translate${props.dragDirection}(${toastDragClass.delta}px)`;
			toast.style.opacity = `${
				1 -
				Math.abs(toastDragClass.delta / toastDragClass.removalDistance)
			}`;
		}
	}

	function onDragEnd() {
		unbindDragEvents();
		const toast = props.nodeRef.current!;
		if (toastDragClass.canDrag && toastDragClass.isDrag && toast) {
			toastDragClass.canDrag = false;
			// toastDragClass.isDrag = false;
			if (
				Math.abs(toastDragClass.delta) > toastDragClass.removalDistance
			) {
				setIsCloseByDrag(true);
				props.onClose();
				return;
			}
			toast.style.transition = "transform 0.2s, opacity 0.2s";
			toast.style.transform = `translate${props.dragDirection}(0)`;
			toast.style.opacity = "1";
		}
	}
	function onClick() {
		if (props.isAutoClose && !toastDragClass.isDrag) {
			props.onClose();
		}
	}
	const eventHandlers: DOMAttributes<HTMLElement> = {
		onMouseDown: onDragStart,
		onTouchStart: onDragStart,
		onClick: onClick,
	};
	return { eventHandlers, isCloseByDrag, isFocusLoss };
};
