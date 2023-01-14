import { useState } from "react";
import { toast } from "../cores/Toast/Toast";
import {
	ContainerPositionType,
	Id,
	ToastTheme,
	ToastType,
} from "../types/Toast/type";
import { ToastContainer } from "@src/components";

function TestToast() {
	const [count, setCount] = useState(0);
	const [id, setId] = useState<Id>("");

	const getPosition = (count: number): ContainerPositionType => {
		const index = count % 6;
		switch (index) {
			case 0:
				return "top-left";
			case 1:
				return "top-right";
			case 2:
				return "top-center";
			case 3:
				return "bottom-left";
			case 4:
				return "bottom-right";
			case 5:
				return "bottom-center";
			default:
				return "top-left";
		}
	};
	const getType = (count: number): ToastType => {
		const index = count % 5;
		switch (index) {
			case 0:
				return "default";
			case 1:
				return "error";
			case 2:
				return "info";
			case 3:
				return "success";
			case 4:
				return "warning";

			default:
				return "default";
		}
	};

	const getTheme = (count: number): ToastTheme => {
		const index = count % 3;
		switch (index) {
			case 0:
				return "light";
			case 1:
				return "dark";
			case 2:
				return "colored";

			default:
				return "light";
		}
	};

	return (
		<div
			className="App"
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div>
				<button
					onClick={() => {
						toast(`toast-number-${count}`, {
							position: getPosition(count),
							type: getType(count),
							theme: getTheme(count),
						});
						setCount(count + 1);
					}}
				>
					add
				</button>
				<button
					onClick={() => {
						let id = toast.default("toast-default", {
							// isAutoClose: false,
							closeDelay: 10000,
						});
						setId(id);
					}}
				>
					default
				</button>
				<button
					onClick={() => {
						toast.error("toast-error", {});
					}}
				>
					error
				</button>
				<button
					onClick={() => {
						toast.info("toast-error");
					}}
				>
					info
				</button>
				<button
					onClick={() => {
						toast.success(`toast-number-success`);
					}}
				>
					success
				</button>
				<button
					onClick={() => {
						toast.warning(`toast-warning`);
					}}
				>
					warning
				</button>
				<button
					onClick={() => {
						toast.update(id, { content: "updated" });
					}}
				>
					update
				</button>
				<button
					onClick={() => {
						toast.clearAll();
					}}
				>
					clear All
				</button>
				<button
					onClick={() => {
						toast.promise(
							new Promise<void>((resolve, reject) => {
								setTimeout(() => {
									resolve();
								}, 5000);
							}),
							{
								pending: `pendding ${count}`,
								success: "Success",
								error: "Error",
							}
						);
						setCount(count + 1);
					}}
				>
					promise
				</button>
			</div>
			<ToastContainer position="top-left" />
		</div>
	);
}

export default TestToast;
