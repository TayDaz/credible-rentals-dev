import { useRef } from "react";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";

const SearchbarFilter = (props) => {
	const {
		range,
		minRange,
		maxRange,
		rangeStep,
		onRangeChange,
		filter,
		onFilterChange,
		onApplyFilterSort,
		filters,
	} = props;

	const op = useRef(null);

	const handleOnRangeChange = (e) => {
		onRangeChange(e.value);
	};

	const handleOnFilterChange = (e) => {
		onFilterChange(e.value);
	};

	const handleOnApplyFilterSort = (e) => {
		// op.current.toggle(e);
		onApplyFilterSort();
	};

	return (
		<>
			<Button
				icon="pi pi-sort-amount-down-alt"
				className="p-button-rounded p-button-text"
				onClick={(e) => op.current.toggle(e)}
			/>
			<OverlayPanel ref={op} dismissable>
				<h5>
					Price Range: [{range[0]}, {range[1]}]
				</h5>
				<Slider
					value={range}
					onChange={handleOnRangeChange}
					range
					min={minRange}
					max={maxRange}
					step={rangeStep}
					animate
				/>
				<Divider />
				Sort By:{" "}
				<Dropdown
					value={filter}
					options={filters}
					onChange={handleOnFilterChange}
					// optionLabel="name"
					placeholder="Sort by ..."
				/>
				<Divider />
				<Button
					label="Apply"
					className="p-button-rounded p-button-success"
					onClick={handleOnApplyFilterSort}
				/>
			</OverlayPanel>
		</>
	);
};

export default SearchbarFilter;
