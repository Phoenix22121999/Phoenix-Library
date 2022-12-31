import { eventListener } from "@src/cores/Toast/EventListener";
import { toastContainerClass } from "@src/cores/Toast/ToastContainerClass";
import { ToastContainerProps } from "@src/components/Toast/ToastContainer/ToastContainer";
import { ToastItemProps } from "@src/components/Toast/ToastItem/ToastItem";
import {
	ContainerPositionType,
	EventType,
	Id,
	OnAddCallback,
	OnRemoveCallback,
	OnUpdateCallback,
	UpdateOptions,
} from "@src/types/Toast/type";
import { createRef, useEffect, useState } from "react";
import useEffectOnce from "../common/useEffectOne";

const DEFAULT_OPTION: ToastItemProps = {
	content: "",
	id: 0,
	nodeRef: createRef(),
	position: "top-left",
	type: "default",
	onClose: () => {},
	isAutoClose: true,
	closeDelay: 5000,
	isPauseOnHover: true,
	isCloseOnClick: true,
	theme: "light",
	isDragToClose: true,
	dragDirection: "X",
	dragThreshold: 80,
	isPauseOnFocusLoss: true,
	updatedId: 0,
	isLoading: false,
	data: {},
};

export const useToastContainer = ({
	limit = 0,
	...containerProps
}: ToastContainerProps) => {
	const [toastList, setToastList] = useState<ToastItemProps[]>([]);
	const [renderedList, setRenderedList] = useState<ContainerPositionType[]>(
		[]
	);
	const [containerList, setContainerList] = useState<{
		[key in ContainerPositionType]: ToastItemProps[];
	}>({
		"bottom-center": [],
		"top-center": [],
		"bottom-left": [],
		"top-left": [],
		"bottom-right": [],
		"top-right": [],
	});
	useEffectOnce(() => {
		eventListener.on(EventType.ADD, onAdd);
		eventListener.on(EventType.UPDATE, onUpdate);
		eventListener.on(EventType.REMOVE, onClear);
		eventListener.on(EventType.CLEAR_ALL, onClearAll);
		return () => {
			eventListener.off(EventType.ADD);
			eventListener.off(EventType.CLEAR_ALL);
			eventListener.off(EventType.UPDATE);
			eventListener.off(EventType.REMOVE);
		};
	});

	useEffect(() => {
		toastContainerClass.setLimit(limit);
	}, [limit]);

	const setStateFromClass = () => {
		setToastList(toastContainerClass.getToastList());
		setContainerList(toastContainerClass.getContainerToastList());
	};

	const onClearAll = () => {
		toastContainerClass.clearAll();
		setStateFromClass();
	};
	const onAdd: OnAddCallback = (content, option) => {
		const newToast: ToastItemProps = {
			...DEFAULT_OPTION,
			...containerProps,
			...option,
			content,
			id: option.id,
			nodeRef: createRef<HTMLDivElement>(),
			onClose: () => removeToast(option.id),
		};
		appendToast(newToast);
	};
	const onUpdate: OnUpdateCallback = (id, option) => {
		updateToast(id, option);
	};

	const onClear: OnRemoveCallback = (id: Id) => {
		removeToast(id);
	};

	function updateToast(id: Id, options: UpdateOptions) {
		if (toastContainerClass.checkActive(id)) {
			toastContainerClass.updateToast(id, options);
			setStateFromClass();
		}
	}

	function appendToast(newToast: ToastItemProps) {
		toastContainerClass.addToast(newToast);
		if (!toastContainerClass.checkIsRendered(newToast.position)) {
			toastContainerClass.addRendered(newToast.position);
			setRenderedList(toastContainerClass.getRenderedList());
			setTimeout(() => {
				setStateFromClass();
			}, 100);
		} else {
			setStateFromClass();
		}
	}

	function removeToast(toastId: Id) {
		toastContainerClass.removeToast(toastId);
		setStateFromClass();
		// setToastList(toastContainerClass.getToastList());
		// setContainerList(toastContainerClass.getContainerToastList());
	}

	function deleteContainer(position: ContainerPositionType) {
		let isDelete =
			toastContainerClass.checkEmptyAndRemoveContainer(position);
		if (isDelete) {
			setRenderedList(toastContainerClass.getRenderedList());
		}
	}

	function checkWaitListContainer() {
		toastContainerClass.showToastFromWaitList();
	}

	function animationDone(toast: ToastItemProps) {
		checkWaitListContainer();
		deleteContainer(toast.position);
		setStateFromClass();
	}

	function checkToastActive(toastId: Id) {
		return toastContainerClass.checkActive(toastId);
	}

	function checkContainerActive(position: ContainerPositionType) {
		return toastContainerClass.checkIsRendered(position);
	}

	return {
		toastList,
		renderedList,
		checkToastActive,
		containerList,
		checkContainerActive,
		animationDone,
	};
};
