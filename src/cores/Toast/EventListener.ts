import {
	Callback,
	EventType,
	Id,
	OnAddCallback,
	OnClearAllCallback,
	OnRemoveCallback,
	OnUpdateCallback,
	TimeoutId,
	ToastOptionType,
	UpdateOptions,
} from "../../types/Toast/type";

export interface EventListener {
	subscribeList: Map<EventType, Callback[]>;
	emitQueue: Map<EventType, TimeoutId[]>;
	on(event: typeof EventType.ADD, callback: OnAddCallback): EventListener;
	on(
		event: typeof EventType.UPDATE,
		callback: OnUpdateCallback
	): EventListener;
	on(
		event: typeof EventType.REMOVE,
		callback: OnRemoveCallback
	): EventListener;
	on(
		event: typeof EventType.CLEAR_ALL,
		callback: OnClearAllCallback
	): EventListener;
	off(event: EventType, callback?: Callback): EventListener;
	cancelEmit(event: EventType): EventListener;
	emit(
		event: EventType,
		content: React.ReactNode | string,
		options: ToastOptionType
	): void;
	emit(event: typeof EventType.UPDATE, id: Id, options: UpdateOptions): void;
	emit(event: typeof EventType.CLEAR_ALL): void;
	emit(event: typeof EventType.REMOVE, id: Id): void;
}

export const eventListener: EventListener = {
	subscribeList: new Map(),
	emitQueue: new Map(),
	on(event: EventType, callback: Callback) {
		this.subscribeList.has(event) || this.subscribeList.set(event, []);
		this.subscribeList.get(event)!.push(callback);
		return this;
	},

	off(event, callback) {
		if (callback) {
			const cb = this.subscribeList
				.get(event)!
				.filter((cb) => cb !== callback);
			this.subscribeList.set(event, cb);
			return this;
		}
		this.subscribeList.delete(event);
		return this;
	},

	cancelEmit(event) {
		const timers = this.emitQueue.get(event);
		if (timers) {
			timers.forEach(clearTimeout);
			this.emitQueue.delete(event);
		}

		return this;
	},

	emit(event: EventType, ...args: any[]) {
		this.subscribeList.has(event) &&
			this.subscribeList.get(event)!.forEach((callback: Callback) => {
				const timer: TimeoutId = setTimeout(() => {
					// @ts-ignore
					callback(...args);
				}, 0);

				this.emitQueue.has(event) || this.emitQueue.set(event, []);
				this.emitQueue.get(event)!.push(timer);
			});
	},
};
