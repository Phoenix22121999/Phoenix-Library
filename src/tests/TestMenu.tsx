import { Menu } from "@src/components";
import { MenuProps } from "@src/components/Menu/Menu/Menu";

type Props = {};

const items: MenuProps["items"] = [
	{
		label: "Navigation 1",
		itemKey: "1",
		onClick: () => {
			console.log("custom click 1");
		},
	},
	{
		label: "Navigation 2",
		itemKey: "2",
		isDisabled: true,
	},
	{
		label: "Navigation 3",
		itemKey: "3",
		items: [
			{
				label: "Navigation 3 1",
				itemKey: "3 1",
			},
			{
				label: "Navigation 3 2",
				itemKey: "3 2",
				items: [
					{
						label: "Navigation 3 2 1",
						itemKey: "3 2 1",
						isDisabled: true,
						items: [],
					},
					{
						label: "Navigation 3 2 2",
						itemKey: "3 2 2",
						items: [
							{
								label: "Navigation 3 2 2 1",
								itemKey: "3 2 2 1",
								isDisabled: true,
							},
							{
								label: "Navigation 3 2 2 2",
								itemKey: "3 2 2 2",
								items: [
									{
										label: "Navigation 3 2 2 2 1",
										itemKey: "3 2 2 2 1",
										isDisabled: true,
									},
									{
										label: "Navigation 3 2 2 2 2",
										itemKey: "3 2 2 2 2",
										isDisabled: true,
									},
								],
							},
						],
					},
				],
			},
		],
	},
];

const TestMenu = (props: Props) => {
	const onClick = (key: string) => {
		console.log(key);
	};
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Menu items={items} onItemClick={onClick} />
		</div>
	);
};

export default TestMenu;
