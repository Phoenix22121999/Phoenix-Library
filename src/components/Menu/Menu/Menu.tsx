import { MenuItemType, OnMenuClick } from "@src/types";
import MenuItem from "../MenuItem/MenuItem";
import classnames from "classnames";
import "./Menu.scss";
import { MenuContextProvider } from "@src/contexts";
export type MenuProps = {
	items: MenuItemType[];
	mode?: "horizontal";
	// mode?: "horizontal" | "vertical";
	onItemClick?: OnMenuClick;
};

const Menu = ({ items, mode = "horizontal", onItemClick }: MenuProps) => {
	return (
		<MenuContextProvider onClick={onItemClick}>
			<ul className={classnames("phoenix-menu", `phoenix-menu"-${mode}`)}>
				{items.map((item) => {
					return (
						<MenuItem
							isFirst
							key={`${item.itemKey}-${item.label}`}
							{...item}
						/>
					);
				})}
			</ul>
		</MenuContextProvider>
	);
};

export default Menu;
