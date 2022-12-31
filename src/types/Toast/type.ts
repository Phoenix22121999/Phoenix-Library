import { ToastItemProps } from "../../components/Toast/ToastItem/ToastItem";

export type ContainerAlignHorizontalType = "left" | "center" | "right";
export type ContainerAlignverticalType = "bottom" | "top";
export type ContainerPositionType =
	`${ContainerAlignverticalType}-${ContainerAlignHorizontalType}`;

export const EventType = {
	ADD: "Add",
	REMOVE: "Remove",
	CLEAR_ALL: "Clear_All",
	UPDATE: "Update",
} as const;

export type Id = number | string;

export type EventType = typeof EventType[keyof typeof EventType];

export type ToastContent = React.ReactNode | string;

export type ToastType = "default" | "success" | "error" | "info" | "warning";
export type ToastTheme = "light" | "dark" | "colored";

export type ToastOptionType<T = unknown> = {
	type?: ToastType;
	id: Id;
	updatedId?: Id;
	position?: ContainerPositionType;
	isAutoClose?: boolean;
	closeDelay?: number;
	isCloseOnClick?: boolean;
	theme?: ToastTheme;
	isDragToClose?: boolean;
	dragDirection?: DragDirectionType;
	dragThreshold?: number;
	isPauseOnHover?: boolean;
	isPauseOnFocusLoss?: boolean;
	isLoading?: boolean;
	data?: T;
};
export type ContainerToastList = {
	position: ContainerPositionType;
	list: ToastItemProps[];
};
export type OnAddCallback = (
	content: ToastContent,
	options: ToastOptionType
) => void;
export type OnUpdateCallback = (id: Id, options: UpdateOptions) => void;
export type OnRemoveCallback = (id: Id) => void;
export type OnClearAllCallback = () => void;

export type Callback =
	| OnAddCallback
	| OnRemoveCallback
	| OnClearAllCallback
	| OnUpdateCallback;

export type TimeoutId = ReturnType<typeof setTimeout>;

export const DragDirection = {
	X: "X",
	Y: "Y",
} as const;

export type DragDirectionType =
	typeof DragDirection[keyof typeof DragDirection];

export interface DraggableToast {
	start: number;
	x: number;
	y: number;
	delta: number;
	removalDistance: number;
	canCloseOnClick: boolean;
	canDrag: boolean;
	boundingRect: DOMRect | null;
	didMove: boolean;
}

export type DragEvent = MouseEvent & TouchEvent;

export interface ToastPromiseParams<
	TData = unknown,
	TError = unknown,
	TPending = unknown
> {
	pending?: string | UpdateOptions<TPending>;
	success?: string | UpdateOptions<TData>;
	error?: string | UpdateOptions<TError>;
}

export interface UpdateOptions<T = unknown> extends ToastOptionType<T> {
	/**
	 * Used to update a toast.
	 * Pass any valid ReactNode(string, number, component)
	 */
	content?: ToastContent;
}
