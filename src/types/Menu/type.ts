export type MenuItemType = {
	label: string;
	itemKey: string;
	icon?: React.ReactNode;
	isDisabled?: boolean;
	items?: MenuItemType[];
	onClick?: OnMenuClick;
};

export type OnMenuClick = (key: string, event: React.MouseEvent) => void;

export type MenuContextType = {
	activeMenus: string[];
	addActiveMenu: (key: string) => void;
	removeActiveMenu: (key: string) => void;
	onClick: OnMenuClick;
};
