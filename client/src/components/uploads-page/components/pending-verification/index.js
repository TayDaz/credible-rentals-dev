import { useState } from "react";
import ProductFilter from "../product-filter";
import ProductCollection from "../product-collection";
import { getFilteredAdds } from "../utils/getFilteredAdds";
import { DATE } from "../../../../constants";

const PendingVerification = (props) => {
	const [adds, setAdds] = useState(
		props?.adds.length ? getFilteredAdds(DATE, props.adds) : {}
	);

	const handleSetFilteredAdds = (filteredAdds) => {
		setAdds(filteredAdds);
	};

	return (
		<>
			<ProductFilter
				setFilteredAdds={handleSetFilteredAdds}
				adds={props.adds}
			/>
			{Object.entries(adds).map(([filterName, add], indx) => (
				<ProductCollection
					products={add}
					key={indx}
					filterName={filterName}
				/>
			))}
			{/* {
				Object.entries(adds)
			} */}
			{/* <ProductCollection products={adds} />
			<ProductCollection products={adds} /> */}
		</>
	);
};

export default PendingVerification;
