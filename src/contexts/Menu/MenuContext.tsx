import { MenuContextType, OnMenuClick } from "@src/types";
import { ReactNode, createContext, useState } from "react";

export const MenuContext = createContext<MenuContextType | null>(null);

type MenuContextProviderType = {
	children?: ReactNode;
	onClick?: OnMenuClick;
};

const MenuContextProvider = ({
	children,
	onClick = () => {},
}: MenuContextProviderType) => {
	const [activeMenus, setActiveMenus] = useState<string[]>([]);

	const addActiveMenu = (key: string) => {
		setActiveMenus((state) => {
			return [...state, key];
		});
	};

	const removeActiveMenu = (key: string) => {
		setActiveMenus((state) => {
			if (state.includes(key)) {
				return [...state].slice(0, state.indexOf(key));
			} else {
				return state;
			}
		});
	};
	return (
		<MenuContext.Provider
			value={{ activeMenus, addActiveMenu, removeActiveMenu, onClick }}
		>
			{children}
		</MenuContext.Provider>
	);
};
export default MenuContextProvider;
