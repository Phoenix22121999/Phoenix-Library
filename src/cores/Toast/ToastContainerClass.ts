import { ToastItemProps } from "../../components/Toast/ToastItem/ToastItem";
import {
	ContainerPositionType,
	Id,
	UpdateOptions,
} from "../../types/Toast/type";

class ToastContainerClass {
	private toastMap: Map<Id, ToastItemProps>;
	private waitMap: Map<Id, ToastItemProps>;
	private containerMap: Map<ContainerPositionType, Map<Id, ToastItemProps>>;
	private renderedMap: Map<ContainerPositionType, boolean>;
	private toastLimit: number;
	constructor() {
		this.toastMap = new Map<Id, ToastItemProps>();
		this.waitMap = new Map<Id, ToastItemProps>();
		this.containerMap = new Map<
			ContainerPositionType,
			Map<Id, ToastItemProps>
		>();
		this.renderedMap = new Map<ContainerPositionType, boolean>();
		this.toastLimit = 0;
	}

	setLimit(v: number) {
		this.toastLimit = v;
	}

	getLimit(): number {
		return this.toastLimit;
	}

	clearAll() {
		this.toastMap.clear();
		this.containerMap.clear();
		// this.renderedMap.clear();
	}
	addRendered(position: ContainerPositionType) {
		this.renderedMap.set(position, true);
	}
	removeRendered(position: ContainerPositionType) {
		this.renderedMap.set(position, false);
	}
	checkIsEmptyContainer(position: ContainerPositionType) {
		return (this.containerMap.get(position)?.size || 0) < 1;
	}
	checkEmptyAndRemoveContainer(position: ContainerPositionType) {
		if (this.checkIsEmptyContainer(position)) {
			this.removeRendered(position);
			return true;
		}
		return false;
	}
	checkIsRendered(position: ContainerPositionType) {
		return this.renderedMap.get(position) === true;
	}
	getRenderedList() {
		let list: ContainerPositionType[] = [];
		this.renderedMap.forEach((value, key) => {
			if (value) {
				list.push(key);
			}
		});
		return list;
	}
	addToast(value: ToastItemProps) {
		if (this.toastLimit > 0 && this.toastMap.size >= this.toastLimit) {
			this.waitMap.set(value.id, value);
		} else {
			this.showToast(value);
		}
	}
	updateToast(id: Id, updateProps: UpdateOptions) {
		const oldProps = this.toastMap.get(id)!;
		const newProps: ToastItemProps = {
			...oldProps,
			...updateProps,
			closeDelay: updateProps.closeDelay
				? updateProps.closeDelay
				: oldProps.closeDelay,
		};
		if (oldProps.position !== newProps.position) {
			this.containerMap.get(oldProps.position)!.delete(oldProps.id);
			this.showToast(newProps);
		} else {
			this.toastMap.set(id, newProps);
			this.containerMap
				.get(newProps.position)!
				.set(newProps.id, newProps);
		}
	}
	showToast(value: ToastItemProps) {
		this.toastMap.set(value.id, value);

		if (!this.containerMap.has(value.position)) {
			const tmp = new Map<Id, ToastItemProps>();
			tmp.set(value.id, value);
			this.containerMap.set(value.position, tmp);
			return;
		}
		this.containerMap.get(value.position)!.set(value.id, value);
	}

	removeToast(id: Id) {
		let deleteToast: ToastItemProps | undefined;
		this.toastMap.has(id) ? this.toastMap.delete(id) : null;
		this.containerMap.forEach((toastList) => {
			if (toastList.has(id)) {
				deleteToast = toastList.get(id)!;
				toastList.delete(id);
			}
		});

		return deleteToast;
	}

	showToastFromWaitList() {
		if (this.waitMap.size > 0) {
			const first = this.waitMap.entries().next().value;
			this.waitMap.delete(first[0]);
			this.showToast(first[1]);
		}
	}

	getToastList(position?: ContainerPositionType) {
		if (!position) {
			return Array.from(this.toastMap.values());
		}
		if (!this.containerMap.has(position)) {
			return [];
		}
		return Array.from(this.containerMap.get(position)!.values());
	}

	getContainerToastList() {
		let list: {
			[key in ContainerPositionType]: ToastItemProps[];
		} = {
			"bottom-center": Array.from(
				this.containerMap.get("bottom-center")?.values() || []
			),
			"top-center": Array.from(
				this.containerMap.get("top-center")?.values() || []
			),
			"bottom-left": Array.from(
				this.containerMap.get("bottom-left")?.values() || []
			),
			"top-left": Array.from(
				this.containerMap.get("top-left")?.values() || []
			),
			"bottom-right": Array.from(
				this.containerMap.get("bottom-right")?.values() || []
			),
			"top-right": Array.from(
				this.containerMap.get("top-right")?.values() || []
			),
		};

		return list;
	}
	checkActive(id: Id) {
		return this.toastMap.has(id);
	}
}

export const toastContainerClass = new ToastContainerClass();
