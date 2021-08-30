import { useEffect, useState } from "react";
import ProductFilter from "../product-filter";
// import ProductCollection from "../product-collection";
import ProductCollection from "../../../../shared-components/product-collection";
import { getFilteredAdds } from "../utils/getFilteredAdds";
import { ACTIVE_ADDS, DATE } from "../../../../constants";
import "./styles.scss";

const AddsDisplayContainer = (props) => {
	// console.log("[adds-display-container/.js] props", props);
	const displayedAdds =
		props.view === ACTIVE_ADDS ? props.activeAdds : props.inactiveAdds;

	useEffect(() => {
		setAdds(
			displayedAdds?.length ? getFilteredAdds(DATE, displayedAdds) : {}
		);
	}, [props.view]);

	const [adds, setAdds] = useState(
		displayedAdds?.length ? getFilteredAdds(DATE, displayedAdds) : {}
	);

	console.log(
		"[adds-display-container/.js] displayedAdds.length ? getFilteredAdds(DATE, displayedAdds) : {}",
		displayedAdds.length ? getFilteredAdds(DATE, displayedAdds) : {}
	);

	console.log(
		"[adds-display-container/.js] displayedAdds, adds",
		displayedAdds,
		adds
	);

	const handleSetFilteredAdds = (filteredAdds) => {
		setAdds(filteredAdds);
	};

	return (
		<>
			<div className="p-text-center add-header-type">{props.view}</div>

			{displayedAdds.length ? (
				<>
					<ProductFilter
						setFilteredAdds={handleSetFilteredAdds}
						adds={displayedAdds}
					/>
					{Object.entries(adds).map(([filterName, add], indx) => (
						// <ProductCollection
						// 	products={add}
						// 	key={indx}
						// 	filterName={filterName}
						// />
						<ProductCollection products={add} key={indx} />
					))}
				</>
			) : (
				<div className="p-text-center">
					{" "}
					You do not have any {props.view} Adds
				</div>
			)}

			{/* {
				Object.entries(adds)
			} */}
			{/* <ProductCollection products={adds} />
			<ProductCollection products={adds} /> */}
		</>
	);
};

export default AddsDisplayContainer;
