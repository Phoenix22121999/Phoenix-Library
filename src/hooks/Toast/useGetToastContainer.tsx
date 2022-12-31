import { useState, useEffect } from "react";

export const useGetToastContainer = () => {
	const [loaded, setLoaded] = useState(false);
	const [toastContainer, setToastContainer] = useState<HTMLDivElement>();
	const [toastContainerId] = useState(`poenix-toast`);
	//   const [toastContainerId] = useState(`toast-portal-${uuid()}`);

	useEffect(() => {
		const div = document.createElement("div");
		div.id = toastContainerId;
		document.getElementsByTagName("body")[0].prepend(div);

		setLoaded(true);
		setToastContainer(div);
		return () => {
			document.getElementsByTagName("body")[0].removeChild(div);
		};
	}, [toastContainerId]);

	return { loaded, toastContainerId, toastContainer };
};

export const useInitToastPortal = () => {
	const [loaded, setLoaded] = useState(false);
	const [toastPortal, setToastPortal] = useState<HTMLDivElement>();
	const [toastPortalId] = useState(`poenix-toast`);
	//   const [toastContainerId] = useState(`toast-portal-${uuid()}`);

	useEffect(() => {
		const div = document.createElement("div");
		div.id = toastPortalId;

		document.getElementsByTagName("body")[0].prepend(div);

		setLoaded(true);
		setToastPortal(div);
		return () => {
			document.getElementsByTagName("body")[0].removeChild(div);
		};
	}, [toastPortalId]);

	return { loaded, toastPortalId, toastPortal };
};
