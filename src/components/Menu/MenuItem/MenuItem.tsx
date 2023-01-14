import { MenuItemType } from "@src/types";
import "./MenuItem.scss";
import MenuDropdown from "./../MenuDropdown/MenuDropdown";
import {
	DOMAttributes,
	MouseEvent,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { MenuContext } from "@src/contexts";
import classNames from "classnames";
interface MenuItemProps extends MenuItemType {
	isFirst?: boolean;
}
const MenuItem = ({
	items,
	label,
	onClick,
	itemKey,
	isFirst,
	isDisabled,
}: MenuItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const {
		addActiveMenu,
		removeActiveMenu,
		onClick: defaultClick,
	} = useContext(MenuContext)!;

	const onMouseEnter = () => {
		addActiveMenu(itemKey);
		setIsOpen(true);
	};
	const onMouseLeave = () => {
		removeActiveMenu(itemKey);
		setIsOpen(false);
	};

	const event: DOMAttributes<HTMLElement> = useMemo(() => {
		if (items) {
			return {
				onMouseEnter,
				onMouseLeave,
			};
		}
		return {};
	}, [items]);
	const handleClick = (e: MouseEvent) => {
		!isDisabled &&
			(onClick ? onClick(itemKey, e) : defaultClick(itemKey, e));
	};
	return (
		<div className="phoenix-menu-item" {...event}>
			<div
				className={classNames("phoenix-menu-item-label", {
					"phoenix-menu-item-label-disable": isDisabled,
				})}
				onClick={handleClick}
			>
				{label}
			</div>
			{items && !isDisabled && (
				<MenuDropdown
					isFirst={isFirst}
					items={items || []}
					// isOpen={activeMenus.includes(itemKey)}
					isOpen={isOpen}
				/>
			)}
		</div>
	);
};
export default MenuItem;
