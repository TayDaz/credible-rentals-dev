import { useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";

const SearchbarFilter = (props) => {
	const { search, filter, onSearchChange, onFilterChange, filters } = props;

	const op = useRef(null);

	return (
		<>
			<div className="p-grid p-fluid search-filter__container">
				<div className="p-col-8 search__wrapper">
					<span className="p-input-icon-right">
						<i className="pi pi-search" />
						<InputText
							value={search}
							onChange={onSearchChange}
							placeholder="Search items here...."
						/>
					</span>
				</div>
				<div className="p-col-4 filter__container">
					<Dropdown
						value={filter}
						options={filters}
						onChange={onFilterChange}
						// optionLabel="name"
						placeholder="Sort by ..."
					/>
				</div>
			</div>
		</>
	);
};

export default SearchbarFilter;
