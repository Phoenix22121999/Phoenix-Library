import { isFn, isStr, uuid } from "@src/utils/FunctionUtils";
import { eventListener } from "./EventListener";
import {
	EventType,
	Id,
	ToastContent,
	ToastOptionType,
	ToastPromiseParams,
	ToastType,
	UpdateOptions,
} from "../../types/Toast/type";
import { emit } from "process";

function dispatchToast(content: ToastContent, options: ToastOptionType): Id {
	eventListener.emit(EventType.ADD, content, options);

	return options.id;
}

// function dispatchClearCall() {
// 	eventListener.emit(EventType.CLEAR_ALL, null, null);
// }

function generateToastId() {
	return uuid();
}

function mergeOptions(
	type: ToastType,
	options?: Partial<ToastOptionType>
): ToastOptionType {
	return {
		...options,
		type: (options && options.type) || type,
		id: options?.id ? options.id : generateToastId(),
	} as ToastOptionType;
}

const toast = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "isLoading">
) => {
	return dispatchToast(content, mergeOptions("default", options));
};

toast.default = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "type" | "isLoading">
) => {
	return dispatchToast(content, mergeOptions("default", options));
};

toast.error = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "type" | "isLoading">
) => {
	return dispatchToast(content, mergeOptions("error", options));
};

toast.info = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "type" | "isLoading">
) => {
	return dispatchToast(content, mergeOptions("info", options));
};

toast.success = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "type" | "isLoading">
) => {
	return dispatchToast(content, mergeOptions("success", options));
};

toast.warning = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "type" | "isLoading">
) => {
	return dispatchToast(content, mergeOptions("warning", options));
};

toast.clear = (id: Id) => {
	eventListener.emit(EventType.REMOVE, id);
};

toast.update = (id: Id, options: Omit<UpdateOptions, "id">) => {
	eventListener.emit(EventType.UPDATE, id, {
		id,
		updatedId: generateToastId(),
		...options,
	});
};

toast.loading = (
	content: ToastContent,
	options?: Omit<Partial<ToastOptionType>, "type" | "isLoading">
) => {
	return dispatchToast(
		content,
		mergeOptions("default", { ...options, isLoading: true })
	);
};

toast.promise = <TData, TError, TPending>(
	promise: Promise<TData> | (() => Promise<TData>),
	{ pending, error, success }: ToastPromiseParams<TData, TError, TPending>,
	options?: ToastOptionType
) => {
	let id: Id;
	if (pending) {
		id = isStr(pending)
			? toast.loading(pending, options)
			: toast.loading(pending.content, options);
	}
	const p = isFn(promise) ? promise() : promise;

	p.then((result) => {
		if (!success) {
			toast.clear(id);
			return;
		}
		if (id) {
			toast.update(
				id,
				isStr(success)
					? {
							...options,
							type: "success",
							data: result,
							isLoading: false,
							content: success,
					  }
					: {
							...success,
							type: "success",
							data: result,
							isLoading: false,
					  }
			);
		} else {
			isStr(success)
				? toast.success(success, options)
				: toast.success(success.content, {
						...success,
						data: result,
				  });
		}
		return p;
	}).catch((err) => {
		if (!error) {
			toast.clear(id);
			return;
		}
		if (id) {
			toast.update(
				id,
				isStr(error)
					? { ...options, type: "error", data: err, isLoading: false }
					: { ...error, type: "error", data: err, isLoading: false }
			);
		} else {
			isStr(error)
				? toast.error(error, options)
				: toast.error(error.content, error);
		}
	});
};

toast.clearAll = () => {
	eventListener.emit(EventType.CLEAR_ALL);
};

export { toast };
