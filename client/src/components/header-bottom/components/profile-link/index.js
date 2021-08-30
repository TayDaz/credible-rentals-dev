import { useState, useRef } from "react";
import { Menu } from "primereact/menu";

const ProfileLink = (props) => {
	const menu = useRef(null);
	const toast = useRef(null);

	let items = [
		{
			label: "Profile",
			icon: "pi pi-fw pi-plus",
			command: () => {
				props.routeToProfilePage();
			},
		},
		{
			label: "Logout",
			icon: "pi pi-fw pi-trash",
			command: () => {
				props.logoutUser();
			},
		},
	];

	// const items = [
	// 	{
	// 		label: "Options",
	// 		items: [
	// 			{
	// 				label: "Update",
	// 				icon: "pi pi-refresh",
	// 				command: () => {
	// 					toast.current.show({
	// 						severity: "success",
	// 						summary: "Updated",
	// 						detail: "Data Updated",
	// 						life: 3000,
	// 					});
	// 				},
	// 			},
	// 			{
	// 				label: "Delete",
	// 				icon: "pi pi-times",
	// 				command: () => {
	// 					toast.current.show({
	// 						severity: "warn",
	// 						summary: "Delete",
	// 						detail: "Data Deleted",
	// 						life: 3000,
	// 					});
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		label: "Navigate",
	// 		items: [
	// 			{
	// 				label: "React Website",
	// 				icon: "pi pi-external-link",
	// 				url: "https://reactjs.org/",
	// 			},
	// 			{
	// 				label: "Router",
	// 				icon: "pi pi-upload",
	// 				command: (e) => {
	// 					window.location.hash = "/fileupload";
	// 				},
	// 			},
	// 		],
	// 	},
	// ];

	return (
		<>
			<div
				className="p-col-4 item"
				onClick={(e) => menu.current.toggle(e)}
			>
				Profile
			</div>
			<Menu model={items} popup ref={menu} id="popup_menu" />
		</>
	);
};

export default ProfileLink;
