import { MenuItemType } from "@src/types";
import "./MenuDropdown.scss";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import MenuItem from "../MenuItem/MenuItem";
type MenuDropdownProps = {
	items: MenuItemType[];
	isOpen?: boolean;
	isFirst?: boolean;
};

const MenuDropdown = ({ items, isOpen, isFirst }: MenuDropdownProps) => {
	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		<CSSTransition
			in={isOpen}
			timeout={300}
			classNames="phoenix-menu-dropdown-transition"
			nodeRef={nodeRef}
			// addEndListener={(done) => {
			// 	nodeRef.current!.addEventListener("transitionend", done, false);
			// }}
			unmountOnExit
			mountOnEnter
		>
			<div
				ref={nodeRef}
				className={classNames("phoenix-menu-dropdown", {
					"is-first": isFirst,
				})}
			>
				{items.map((item) => {
					return (
						<MenuItem
							key={`${item.itemKey}-${item.label}`}
							{...item}
						/>
					);
				})}
			</div>
		</CSSTransition>
	);
};
export default MenuDropdown;
