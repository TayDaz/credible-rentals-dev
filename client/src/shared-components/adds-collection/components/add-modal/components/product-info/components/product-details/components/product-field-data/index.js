import {
	DROP_DOWN,
	INPUT_TEXT,
	DATE,
	CALENDAR,
	GROUP__INPUT_TEXT__DROP_DOWN,
	GROUP__INPUT_NUMBER__DROP_DOWN,
	GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN,
} from "../../../../../../../../../../constants";

import "./styles.scss";

const ProductFieldData = (props) => {
	const { field, product } = props;

	// debugger;

	const getFieldData = () => {
		switch (field.fieldType) {
			case INPUT_TEXT:
				return (
					<>
						<span className="product-field-name">
							{field.floatLabel}:{" "}
						</span>
						<span className="product-field-value">
							{product[field.name]}
						</span>
					</>
				);
			case DROP_DOWN:
				return (
					<>
						<span className="product-field-name">
							{field.floatLabel}:{" "}
						</span>
						<span className="product-field-value">
							{
								field.options.find(
									(obj) => obj.value === product[field.name]
								).label
							}
						</span>
					</>
				);

			case CALENDAR:
				return (
					<>
						<span className="product-field-name">
							{field.floatLabel}:{" "}
						</span>
						<span className="product-field-value">
							{product[field.name]}
						</span>
					</>
				);

			case GROUP__INPUT_TEXT__DROP_DOWN:
				return (
					<>
						<div className="product-field-name">
							{field.floatLabelInputText}
						</div>
						<div className="product-field-value">
							{product[field.nameInputText]}{" "}
							{
								field.options.find(
									(obj) =>
										obj.value ===
										product[field.nameDropDown]
								).label
							}
						</div>
						{/* <div
			      className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}
			    >
			      <div className="p-inputgroup">
			        <span className="p-float-label">
			          <InputText
			            name={data.nameInputText}
			            inputId={data.nameInputText}
			            value={props.values[data.nameInputText]}
			            // placeholder={data.placeholderInputText}
			            onChange={props.onChange}
			          />
			          <label htmlFor={data.nameInputText}>
			            {data.floatLabelInputText}
			          </label>
			        </span>
			        <span className="p-float-label">
			          <Dropdown
			            name={data.nameDropDown}
			            inputId={data.nameDropDown}
			            value={props.values[data.nameDropDown]}
			            onChange={props.onChange}
			            // placeholder={data.placeholderDropDown}
			            options={data.options}
			            optionLabel="label"
			          />
			          <label htmlFor={data.nameDropDown}>
			            {data.floatLabelDropDown}
			          </label>
			        </span>
			      </div>
			    </div>
           */}
					</>
				);
			case GROUP__INPUT_NUMBER__DROP_DOWN:
				// debugger;
				return (
					<>
						<span className="product-field-name">
							{field.floatLabelInputNumber}:{" "}
						</span>
						<span className="product-field-value">
							{product[field.nameInputNumber]}{" "}
							{
								field.options.find(
									(obj) =>
										obj.value ===
										product[field.nameDropDown]
								).label
							}
						</span>
						{/* <div
			      className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}
			    >
			      <div className="p-inputgroup">
			        <span className="p-float-label">
			          <InputText
			            name={data.nameInputNumber}
			            inputId={data.nameInputNumber}
			            value={props.values[data.nameInputNumber]}
			            // placeholder={data.placeholderInputNumber}
			            onChange={props.onChange}
			          />
			          <label htmlFor={data.nameInputNumber}>
			            {data.floatLabelInputNumber}
			          </label>
			        </span>
			        <span className="p-float-label">
			          <Dropdown
			            name={data.nameDropDown}
			            inputId={data.nameDropDown}
			            value={props.values[data.nameDropDown]}
			            onChange={props.onChange}
			            // placeholder={data.placeholderDropDown}
			            options={data.options}
			            optionLabel="label"
			          />
			          <label htmlFor={data.nameDropDown}>
			            {data.floatLabelDropDown}
			          </label>
			        </span>
			      </div>
			    </div> */}
					</>
				);

			case GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN:
				return (
					<>
						<span className="product-field-name">
							{field.floatLabelInputNumber}:{" "}
						</span>
						<span className="product-field-value">
							{product[field.nameInputNumber]}{" "}
							{
								field.options1.find(
									(obj) =>
										obj.value ===
										product[field.nameDropDown1]
								).label
							}
							{
								field.options2.find(
									(obj) =>
										obj.value ===
										product[field.nameDropDown2]
								).label
							}
						</span>
						{/* <div
			      className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}
			    >
			      <div className="p-inputgroup">
			        <span className="p-float-label">
			          <InputText
			            name={data.nameInputNumber}
			            inputId={data.nameInputNumber}
			            value={props.values[data.nameInputNumber]}
			            // placeholder={data.placeholderInputNumber}
			            onChange={props.onChange}
			          />
			          <label htmlFor={data.nameInputNumber}>
			            {data.floatLabelInputNumber}
			          </label>
			        </span>
			        <span className="p-float-label">
			          <Dropdown
			            name={data.nameDropDown1}
			            inputId={data.nameDropDown1}
			            value={props.values[data.nameDropDown1]}
			            onChange={props.onChange}
			            // placeholder={data.placeholderDropDown1}
			            options={data.options1}
			            optionLabel="label"
			          />
			          <label htmlFor={data.nameDropDown1}>
			            {data.floatLabelDropDown1}
			          </label>
			        </span>
			        <span className="p-float-label">
			          <Dropdown
			            name={data.nameDropDown2}
			            inputId={data.nameDropDown2}
			            value={props.values[data.nameDropDown2]}
			            onChange={props.onChange}
			            // placeholder={data.placeholderDropDown2}
			            options={data.options2}
			            optionLabel="label"
			          />
			          <label htmlFor={data.nameDropDown2}>
			            {data.floatLabelDropDown2}
			          </label>
			        </span>
			      </div>
			    </div> */}
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className="product-field-data__container">{getFieldData()}</div>
	);
};

export default ProductFieldData;
