import { Sidebar } from "primereact/sidebar";
// import Furniture from "./assets/couch-solid.svg";
// import ElectricalAndElectronics from "./assets/tv-solid.svg";
// import Bicycle from "./assets/bicycle-solid.svg";
// import Car from "./assets/car-side-solid.svg";
// import CarTrailer from "./assets/trailer-solid.svg";
// import Bikes from "./assets/motorcycle-solid.svg";
// import SpeedBoat from "./assets/ship-solid.svg";
// import Books from "./assets/book-solid.svg";
// import FlatHouse from "./assets/home-solid.svg";
// import DesignerClothes from "./assets/tshirt-solid.svg";
// import WomenJewellery from "./assets/gem-regular.svg";
// import FarmingAndGardeningEquipments from "./assets/tractor-solid.svg";

import "./styles.scss";
import {
	BICYCLE,
	BIKE,
	BOOK,
	CAR,
	CAR_TRAILER,
	DESIGNER_CLOTH,
	ELECTRICAL_AND_ELECTRONIC,
	FARMING_AND_GARDEN_EQUIPMENT,
	FLAT_HOUSE,
	FURNITURE,
	SPEED_BOAT,
	WOMEN_JEWELLERY,
} from "../../../../constants";
import getIcon from "../../../../shared-components/icons";
import { classNames } from "primereact/utils";
const CustomSidebar = (props) => {
	const { isCollasped, mobileSidebarVisible, view } = props;
	const categories = [
		{
			label: "Furniture",
			key: FURNITURE,
		},
		{
			label: "Electrical & Electronics",
			key: ELECTRICAL_AND_ELECTRONIC,
		},
		{
			label: "Bicycle",
			key: BICYCLE,
		},
		{
			label: "Car",
			key: CAR,
		},
		{
			label: "Car Trailer",
			key: CAR_TRAILER,
		},
		{
			label: "Bikes",
			key: BIKE,
		},
		{
			label: "Speed Boat",
			key: SPEED_BOAT,
		},
		{
			label: "Books",
			key: BOOK,
		},
		{
			label: "Flat/House",
			key: FLAT_HOUSE,
		},
		{
			label: "Designer Clothes",
			key: DESIGNER_CLOTH,
		},
		{
			label: "Women's Jewellery",
			key: WOMEN_JEWELLERY,
		},
		{
			label: "Farming & Gardening Equipments",
			key: FARMING_AND_GARDEN_EQUIPMENT,
		},
	];

	let sidebarWidth,
		linkClasses,
		linkClassesMobile,
		iconClasses,
		iconClassesMobile,
		textClasses,
		textClassesMobile;

	/** CSS classes configuration for desktop sidebar on collasped and expanded*/
	if (isCollasped) {
		sidebarWidth = "59px";
		linkClasses = "p-col-12 p-d-flex p-jc-center link__container";
		iconClasses = "p-d-flex p-jc-center p-ai-center icon__wrapper";
		textClasses = "hidden";
	} else {
		sidebarWidth = "245px";
		linkClasses = "p-col-12 p-d-flex link__container";
		iconClasses = "p-d-flex p-ai-center p-ml-2 icon__wrapper";
		textClasses = "p-d-flex p-ai-center text__wrapper";
	}

	/**CSS classes for mobile sidebar */
	linkClassesMobile = "p-d-flex p-ai-center link__container";
	iconClassesMobile = "p-d-flex p-mr-2 icon__wrapper";
	textClassesMobile = "p-d-flex text__wrapper";

	const getSidebarLinksMobile = () =>
		categories.map(({ label, key }) => (
			<div
				className={classNames(linkClassesMobile, {
					selected: isViewSelected(key),
				})}
				onClick={() => props.changeView(key)}
				key={key}
			>
				<div className={iconClassesMobile}>
					<img src={getIcon(key, isViewSelected(key))} />
				</div>
				<div className={textClassesMobile}>{label}</div>
			</div>
		));

	const getSidebarLinks = () =>
		categories.map(({ label, key }) => (
			<div
				className={classNames(linkClasses, {
					selected: isViewSelected(key),
				})}
				onClick={() => props.changeView(key)}
				key={key}
			>
				<div className={iconClasses}>
					<img src={getIcon(key, isViewSelected(key))} />
				</div>
				<div className={textClasses}>{label}</div>
			</div>
		));

	const hideMobileSidebar = () => {
		props.hideMobileSidebar();
	};

	const isViewSelected = (linkId) => linkId === view;

	return (
		<>
			<div
				className="p-col-fixed p-col-align-stretch p-d-none p-d-md-flex p-flex-column home-page__sidebar__container"
				style={{ width: sidebarWidth }}
			>
				{getSidebarLinks()}
				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(ELECTRICAL_AND_ELECTRONIC),
					})}
					onClick={() => props.changeView(ELECTRICAL_AND_ELECTRONIC)}
				>
					<div className={iconClasses}>
						<img
							src={getIcon(
								ELECTRICAL_AND_ELECTRONIC,
								isViewSelected(ELECTRICAL_AND_ELECTRONIC)
							)}
						/>
					</div>
					<div className={textClasses}>
						Electrical {"&"} Electronics
					</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(BICYCLE),
					})}
					onClick={() => props.changeView(BICYCLE)}
				>
					<div className={iconClasses}>
						<img src={getIcon(BICYCLE, isViewSelected(BICYCLE))} />
					</div>
					<div className={textClasses}>Bicycle</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(CAR),
					})}
					onClick={() => props.changeView(CAR)}
				>
					<div className={iconClasses}>
						<img src={getIcon(CAR, isViewSelected(CAR))} />
					</div>
					<div className={textClasses}>Car</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(CAR_TRAILER),
					})}
					onClick={() => props.changeView(CAR_TRAILER)}
				>
					<div className={iconClasses}>
						<img
							src={getIcon(
								CAR_TRAILER,
								isViewSelected(CAR_TRAILER)
							)}
						/>
					</div>
					<div className={textClasses}>Car Trailer</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(BIKE),
					})}
					onClick={() => props.changeView(BIKE)}
				>
					<div className={iconClasses}>
						<img src={getIcon(BIKE, isViewSelected(BIKE))} />
					</div>
					<div className={textClasses}>Bikes</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(FARMING_AND_GARDEN_EQUIPMENT),
					})}
					onClick={() =>
						props.changeView(FARMING_AND_GARDEN_EQUIPMENT)
					}
				>
					<div className={iconClasses}>
						<img
							src={getIcon(
								FARMING_AND_GARDEN_EQUIPMENT,
								isViewSelected(FARMING_AND_GARDEN_EQUIPMENT)
							)}
						/>
					</div>
					<div className={textClasses}>
						Farming and Gardening Equipments
					</div>
				</div>
			</div>
			<div className="p-d-md-none home-page__sidebar__mobile-container">
				<Sidebar
					visible={mobileSidebarVisible}
					className="ui-sidebar-sm home-page__sidebar__mobile-wrapper"
					onHide={hideMobileSidebar}
				>
					{getSidebarLinksMobile()}
				</Sidebar>
			</div>
		</>
	);
};

export default CustomSidebar;
