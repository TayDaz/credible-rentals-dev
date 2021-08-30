import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { getFilteredAdds } from "../utils/getFilteredAdds";
import { CATEGORY, DATE, SUB_CATEGORY } from "../../../../constants";

const filters = [
	{ name: "Category", code: CATEGORY },
	{ name: "Sub-Category", code: SUB_CATEGORY },
	{ name: "Date", code: DATE },
];

const ProductFilter = (props) => {
	const [search, setSearch] = useState("");
	const [selectedFilter, setSelectedFilter] = useState(DATE);

	const onFilterChange = (e) => {
		setSelectedFilter(e.value);
		console.log(e.value.code);

		props.setFilteredAdds(getFilteredAdds(e.value.code, props.adds));
	};

	return (
		<div className="p-grid p-fluid p-justify-end">
			<div className="p-col-12 p-md-8">
				<span className="p-input-icon-right">
					<i className="pi pi-search" />
					<InputText
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search items here...."
					/>
				</span>
			</div>
			<div className="p-col-12 p-md-4 p-justify-end">
				<Dropdown
					value={selectedFilter}
					options={filters}
					onChange={onFilterChange}
					optionLabel="name"
					placeholder="Filter"
				/>
			</div>
		</div>
	);
};

export default ProductFilter;
