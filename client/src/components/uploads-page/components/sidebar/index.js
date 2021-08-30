import { Badge } from "primereact/badge";
import { classNames } from "primereact/utils";
import { Sidebar } from "primereact/sidebar";

// import NewAddSvg from "./assets/new-add.svg";
// // import ActiveAddsSvg from "./assets/active-adds.svg";
// // import InactiveAddsSvg from "./assets/inactive-adds.svg";

import GetIcon from "../../../../shared-components/icons";

import {
	NEW_ADD,
	ACTIVE_ADDS,
	INACTIVE_ADDS,
	PENDING_VERIFICATION,
} from "../../../../constants";

import "./styles.scss";
import getIcon from "../../../../shared-components/icons";
// const Sidebar = (props) => {
// 	const changeView = (e) => {
// 		//console.log("[uploads-page/sidebar/.js] changeView() e", e.target.id);
// 		props.changeView(e.target.id);
// 	};

// 	const isActive = (viewName) => viewName === props.view;

// 	return (
// 		<>
// 			<div
// 				className={classNames(
// 					"p-col-12 p-d-flex p-jc-between sidebar--item",
// 					{
// 						active: isActive(NEW_ADD),
// 					}
// 				)}
// 				id={NEW_ADD}
// 				onClick={changeView}
// 			>
// 				<span>New Add</span>
// 			</div>
// 			<div
// 				className={classNames(
// 					"p-col-12 p-d-flex p-jc-between p-mt-1 sidebar--item",
// 					{
// 						active: isActive(ACTIVE_ADDS),
// 					}
// 				)}
// 				id={ACTIVE_ADDS}
// 				onClick={changeView}
// 			>
// 				<span>Active Adds</span>
// 				<Badge value="2" className="p-mr-2"></Badge>
// 			</div>
// 			<div
// 				className={classNames(
// 					"p-col-12 p-d-flex p-jc-between p-mt-1 sidebar--item",
// 					{
// 						active: isActive(IN_ACTIVE_ADDS),
// 					}
// 				)}
// 				id={IN_ACTIVE_ADDS}
// 				onClick={changeView}
// 			>
// 				<span>In-Active Adds</span>
// 				<Badge value="2" className="p-mr-2"></Badge>
// 			</div>
// 			<div
// 				className={classNames(
// 					"p-col-12 p-d-flex p-jc-between  p-mt-1 sidebar--item",
// 					{
// 						active: isActive(PENDING_VERIFICATION),
// 					}
// 				)}
// 				id={PENDING_VERIFICATION}
// 				onClick={changeView}
// 			>
// 				Pending Verification
// 			</div>
// 		</>
// 	);
// };

const CustomSidebar = (props) => {
	const { isCollasped, mobileSidebarVisible, view } = props;

	let sidebarWidth,
		linkClasses,
		linkClassesMobile,
		iconClasses,
		iconClassesMobile,
		textClasses,
		textClassesMobile;

	/** CSS classes configuration for desktop sidebar on collasped and expanded*/
	if (isCollasped) {
		sidebarWidth = "70px";
		linkClasses =
			"p-col-12 p-d-flex p-jc-center p-ai-stretch link__container";
		iconClasses = "p-d-flex p-jc-center p-ai-center icon__wrapper";
		textClasses = "hidden";
	} else {
		sidebarWidth = "200px";
		linkClasses = "p-col-12 p-d-flex link__container";
		iconClasses = "p-d-flex p-ai-center p-ml-2 icon__wrapper";
		textClasses = "p-d-flex p-ai-center text__wrapper";
	}

	/**CSS classes for mobile sidebar */
	linkClassesMobile = "p-d-flex p-ai-center link__container";
	iconClassesMobile = "p-d-flex p-mr-2 icon__wrapper";
	textClassesMobile = "p-d-flex text__wrapper";

	const getSidebarLinks = () => {
		return (
			<>
				<div
					className={classNames(linkClassesMobile, {
						selected: isViewSelected(NEW_ADD),
					})}
					onClick={() => props.changeView(NEW_ADD)}
				>
					<div className={iconClassesMobile}>
						<img src={getIcon(NEW_ADD, isViewSelected(NEW_ADD))} />
					</div>
					<div className={textClassesMobile}>New Add</div>
				</div>

				<div
					className={classNames(linkClassesMobile, {
						selected: isViewSelected(ACTIVE_ADDS),
					})}
					onClick={() => props.changeView(ACTIVE_ADDS)}
				>
					<div className={iconClassesMobile}>
						<img
							src={getIcon(
								ACTIVE_ADDS,
								isViewSelected(ACTIVE_ADDS)
							)}
						/>
					</div>
					<div className={textClassesMobile}>Active Adds</div>
				</div>

				<div
					className={classNames(linkClassesMobile, {
						selected: isViewSelected(INACTIVE_ADDS),
					})}
					onClick={() => props.changeView(INACTIVE_ADDS)}
				>
					<div className={iconClassesMobile}>
						<img
							src={getIcon(
								INACTIVE_ADDS,
								isViewSelected(INACTIVE_ADDS)
							)}
						/>
					</div>
					<div className={textClassesMobile}>Inactive Adds</div>
				</div>
			</>
		);
	};

	const hideMobileSidebar = () => {
		props.hideMobileSidebar();
	};

	const isViewSelected = (linkId) => linkId === view;

	return (
		<>
			<div
				className="p-col-fixed p-col-align-stretch p-d-none p-d-md-flex p-flex-column uploads-page__sidebar__container"
				style={{ width: sidebarWidth }}
			>
				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(NEW_ADD),
					})}
					onClick={() => props.changeView(NEW_ADD)}
				>
					<div className={iconClasses}>
						<img src={getIcon(NEW_ADD, isViewSelected(NEW_ADD))} />
					</div>
					<div className={textClasses}>New Add</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(ACTIVE_ADDS),
					})}
					onClick={() => props.changeView(ACTIVE_ADDS)}
				>
					<div className={iconClasses}>
						<img
							src={getIcon(
								ACTIVE_ADDS,
								isViewSelected(ACTIVE_ADDS)
							)}
						/>
					</div>
					<div className={textClasses}>Active Adds</div>
				</div>

				<div
					className={classNames(linkClasses, {
						selected: isViewSelected(INACTIVE_ADDS),
					})}
					onClick={() => props.changeView(INACTIVE_ADDS)}
				>
					<div className={iconClasses}>
						<img
							src={getIcon(
								INACTIVE_ADDS,
								isViewSelected(INACTIVE_ADDS)
							)}
						/>
					</div>
					<div className={textClasses}>Inactive Adds</div>
				</div>
			</div>
			<div className="p-d-md-none uploads-page__sidebar__mobile-container">
				<Sidebar
					visible={mobileSidebarVisible}
					className="ui-sidebar-sm uploads-page__sidebar__mobile-wrapper"
					onHide={hideMobileSidebar}
				>
					{getSidebarLinks()}
				</Sidebar>
			</div>
		</>
	);
};

export default CustomSidebar;
