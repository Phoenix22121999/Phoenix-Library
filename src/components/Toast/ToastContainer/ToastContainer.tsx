import React, { createRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./ToastContainer.scss";
import "./ToastAnimation.scss";
import classnames from "classnames";
import { useInitToastPortal } from "@src/hooks";
import { ToastOptionType } from "../../../types/Toast/type";
import { useToastContainer } from "../../../hooks/Toast/useToastContainer";
import ToastItem from "../ToastItem/ToastItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export interface ToastContainerProps extends Omit<ToastOptionType, "id"> {
	limit?: number;
}

const ToastContainer = (props: ToastContainerProps) => {
	const { loaded, toastPortal } = useInitToastPortal();

	const {
		checkToastActive,
		containerList,
		checkContainerActive,
		renderedList,
		animationDone,
	} = useToastContainer(props);

	return loaded ? (
		ReactDOM.createPortal(
			<>
				{renderedList.map((position) => {
					if (!checkContainerActive(position)) {
						return;
					}
					return (
						<TransitionGroup
							key={position}
							className={classnames("phoenix-toast-container", {
								[`phoenix-toast-container-${position}`]:
									position,
							})}
						>
							{containerList[position].map((item) => {
								return (
									<CSSTransition
										classNames="phoenix-toast-item"
										key={item.id}
										nodeRef={item.nodeRef}
										// timeout={1000}
										addEndListener={(done) => {
											item.nodeRef.current?.addEventListener(
												"animationend",
												() => {
													if (
														checkToastActive(
															item.id
														)
													) {
														done();
													} else {
														collapseToast(
															item.nodeRef
																.current!,
															() => {
																animationDone(
																	item
																);
																done();
															}
														);
													}
												},
												{
													once: true,
												}
											);
										}}
									>
										<ToastItem {...item} />
									</CSSTransition>
								);
							})}
						</TransitionGroup>
					);
				})}
			</>,
			toastPortal!
		)
	) : (
		<></>
	);
};

export function collapseToast(node: HTMLElement, done: () => void) {
	const { scrollHeight, style } = node;

	requestAnimationFrame(() => {
		style.minHeight = "initial";
		style.height = scrollHeight + "px";
		style.transition = `all 200ms`;

		requestAnimationFrame(() => {
			style.height = "0";
			style.padding = "0";
			style.margin = "0";
			setTimeout(done, 200);
		});
	});
}

export default ToastContainer;
