import NewAdd from "./assets/icons/new-add.svg";
import NewAddSelected from "./assets/icons/new-add-selected.svg";
import ActiveAdds from "./assets/icons/active-adds.svg";
import ActiveAddsSelected from "./assets/icons/active-adds-selected.svg";
import InactiveAdds from "./assets/icons/inactive-adds.svg";
import InactiveAddsSelected from "./assets/icons/inactive-adds-selected.svg";
import Furniture from "./assets/icons/couch.svg";
import FurnitureSelected from "./assets/icons/couch-selected.svg";
import ElectricalAndElectronic from "./assets/icons/tv.svg";
import Bicycle from "./assets/icons/bicycle.svg";
import Car from "./assets/icons/car.svg";
import CarTrailer from "./assets/icons/trailer.svg";
import Bike from "./assets/icons/motorcycle.svg";
import SpeedBoat from "./assets/icons/ship.svg";
import Book from "./assets/icons/book.svg";
import FlatHouse from "./assets/icons/home.svg";
import DesignerCloth from "./assets/icons/tshirt.svg";
import WomenJewellery from "./assets/icons/gem.svg";
import FarmingAndGardenEquipment from "./assets/icons/tractor.svg";
import ElectricalAndElectronicSelected from "./assets/icons/tv-selected.svg";
import BicycleSelected from "./assets/icons/bicycle-selected.svg";
import CarSelected from "./assets/icons/car-selected.svg";
import CarTrailerSelected from "./assets/icons/trailer-selected.svg";
import BikeSelected from "./assets/icons/motorcycle-selected.svg";
import SpeedBoatSelected from "./assets/icons/ship-selected.svg";
import BookSelected from "./assets/icons/book-selected.svg";
import FlatHouseSelected from "./assets/icons/home-selected.svg";
import DesignerClothSelected from "./assets/icons/tshirt-selected.svg";
import WomenJewellerySelected from "./assets/icons/gem-selected.svg";
import FarmingAndGardenEquipmentSelected from "./assets/icons/tractor-selected.svg";
import Cart from "./assets/icons/cart.svg";
import CancelledOrders from "./assets/icons/cancelled-orders.svg";
import MyCurrentOrders from "./assets/icons/current-orders.svg";
import MyPreviousOrders from "./assets/icons/previous-orders.svg";
import Wishlist from "./assets/icons/wishlist.svg";
import CartSelected from "./assets/icons/cart-selected.svg";
import CancelledOrdersSelected from "./assets/icons/cancelled-orders-selected.svg";
import MyCurrentOrdersSelected from "./assets/icons/current-orders-selected.svg";
import MyPreviousOrdersSelected from "./assets/icons/previous-orders-selected.svg";
import WishlistSelected from "./assets/icons/wishlist-selected.svg";

import {
	SELECTED,
	DEFAULT,
	NEW_ADD,
	ACTIVE_ADDS,
	INACTIVE_ADDS,
	FURNITURE,
	ELECTRICAL_AND_ELECTRONIC,
	BICYCLE,
	CAR,
	CAR_TRAILER,
	BIKE,
	MOTOR_BIKE,
	SPEED_BOAT,
	BOOK,
	FLAT_HOUSE,
	DESIGNER_CLOTH,
	WOMEN_JEWELLERY,
	FARMING_AND_GARDEN_EQUIPMENT,
	CART,
	MY_CURRENT_ORDERS,
	MY_PREVIOUS_ORDERS,
	CANCELLED_ORDERS,
	WISHLIST,
} from "../../constants";

const iconMap = {
	[NEW_ADD]: {
		[DEFAULT]: NewAdd,
		[SELECTED]: NewAddSelected,
	},
	[ACTIVE_ADDS]: {
		[DEFAULT]: ActiveAdds,
		[SELECTED]: ActiveAddsSelected,
	},
	[INACTIVE_ADDS]: {
		[DEFAULT]: InactiveAdds,
		[SELECTED]: InactiveAddsSelected,
	},
	[FURNITURE]: {
		[DEFAULT]: Furniture,
		[SELECTED]: FurnitureSelected,
	},
	[ELECTRICAL_AND_ELECTRONIC]: {
		[DEFAULT]: ElectricalAndElectronic,
		[SELECTED]: ElectricalAndElectronicSelected,
	},
	[BICYCLE]: {
		[DEFAULT]: Bicycle,
		[SELECTED]: BicycleSelected,
	},
	[CAR]: {
		[DEFAULT]: Car,
		[SELECTED]: CarSelected,
	},
	[CAR_TRAILER]: {
		[DEFAULT]: CarTrailer,
		[SELECTED]: CarTrailerSelected,
	},
	[BIKE]: {
		[DEFAULT]: Bike,
		[SELECTED]: BikeSelected,
	},
	[SPEED_BOAT]: {
		[DEFAULT]: SpeedBoat,
		[SELECTED]: SpeedBoatSelected,
	},
	[BOOK]: {
		[DEFAULT]: Book,
		[SELECTED]: BookSelected,
	},
	[FLAT_HOUSE]: {
		[DEFAULT]: FlatHouse,
		[SELECTED]: FlatHouseSelected,
	},
	[DESIGNER_CLOTH]: {
		[DEFAULT]: DesignerCloth,
		[SELECTED]: DesignerClothSelected,
	},
	[WOMEN_JEWELLERY]: {
		[DEFAULT]: WomenJewellery,
		[SELECTED]: WomenJewellerySelected,
	},
	[FARMING_AND_GARDEN_EQUIPMENT]: {
		[DEFAULT]: FarmingAndGardenEquipment,
		[SELECTED]: FarmingAndGardenEquipmentSelected,
	},
	[CART]: {
		[DEFAULT]: Cart,
		[SELECTED]: CartSelected,
	},
	[MY_CURRENT_ORDERS]: {
		[DEFAULT]: MyCurrentOrders,
		[SELECTED]: MyCurrentOrdersSelected,
	},
	[MY_PREVIOUS_ORDERS]: {
		[DEFAULT]: MyPreviousOrders,
		[SELECTED]: MyPreviousOrdersSelected,
	},
	[CANCELLED_ORDERS]: {
		[DEFAULT]: CancelledOrders,
		[SELECTED]: CancelledOrdersSelected,
	},
	[WISHLIST]: {
		[DEFAULT]: Wishlist,
		[SELECTED]: WishlistSelected,
	},
};

const getIcon = (name, selected) => {
	return iconMap[name][selected ? SELECTED : DEFAULT];
};

export default getIcon;
