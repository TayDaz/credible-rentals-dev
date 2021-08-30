import { Dropdown } from "primereact/dropdown";

const Category = (props) => {
	return (
		<Dropdown
			value={props.value}
			name={props.name}
			options={props.options}
			onChange={props.changeCategory}
			optionLabel="label"
			placeholder="Select a Category"
		/>
	);
};

export default Category;
