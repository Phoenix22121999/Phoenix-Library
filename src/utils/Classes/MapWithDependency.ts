type MapWithDependencyType<T> = {
	value: T;
	dependency: T[];
};

export class MapWithDependencyClass<T> {
	map: Map<T, MapWithDependencyType<T>>;
	constructor(map?: MapWithDependencyType<T>[]) {
		this.map = new Map();
		if (map) {
			map.forEach((item) => {
				this.map.set(item.value, item);
			});
		}
	}
	add(value: T, dependency: T[]) {
		this.map.set(value, { value, dependency });
	}
	// remove(value: T) {
	// 	if (this.map.has(value)) {
	// 		let E =
	// 	}
	// }
}
