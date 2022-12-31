export class ToastDragClass {
	start: number;
	startX: number;
	startY: number;
	x: number;
	y: number;
	delta: number;
	removalDistance: number;
	isDrag: boolean;
	canDrag: boolean;
	boundingRect?: DOMRect;
	constructor() {
		this.start = 0;
		this.startX = 0;
		this.startY = 0;
		this.x = 0;
		this.y = 0;
		this.delta = 0;
		this.removalDistance = 0;
		this.isDrag = true;
		this.canDrag = false;
	}
}
