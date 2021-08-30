import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import flagPlaceholderPng from "./assets/images/flag_placeholder.png";
import "./styles.scss";
import "./flags.css";

const countries = [
	{ name: "Australia", code: "AU", dialCode: "1" },
	{ name: "Brazil", code: "BR", dialCode: "1" },
	{ name: "China", code: "CN", dialCode: "1" },
	{ name: "Egypt", code: "EG", dialCode: "1" },
	{ name: "France", code: "FR", dialCode: "1" },
	{ name: "Germany", code: "DE", dialCode: "1" },
	{ name: "India", code: "IN", dialCode: "91" },
	{ name: "Japan", code: "JP", dialCode: "81" },
	{ name: "Spain", code: "ES", dialCode: "1" },
	{ name: "United States", code: "US", dialCode: "1" },
];

const selectedCountryTemplate = (option, props) => {
	if (option) {
		return (
			<div className="country-mobile-number country-item country-item-value">
				<img
					alt={option.name}
					src={flagPlaceholderPng}
					onError={(e) =>
						(e.target.src =
							"https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
					}
					className={`flag flag-${option.code.toLowerCase()}`}
				/>
				<div>{option.name}</div>
				<div>(+{option.dialCode})</div>
			</div>
		);
	}

	return <span>{props.placeholder}</span>;
};

const countryOptionTemplate = (option) => {
	return (
		<div className="country-item country-mobile-number">
			<img
				alt={option.name}
				src={flagPlaceholderPng}
				onError={(e) =>
					(e.target.src =
						"https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
				}
				className={`flag flag-${option.code.toLowerCase()}`}
			/>
			<div>{option.name}</div>
			<div>(+{option.dialCode})</div>
		</div>
	);
};

const CountryMobileNumber = (props) => {
	// const [selectedCountry, setSelectedCountry] = useState(null);
	// const onCountryChange = (e) => {
	// 	setSelectedCountry(e.value);
	// 	console.log(e.value);
	// };
	return (
		<>
			<div className="p-inputgroup p-inputtext-sm">
				<Dropdown
					value={props.countryCodeValue}
					options={countries}
					onChange={props.handleChange}
					optionLabel={props.countryCodeName}
					name={props.countryCodeName}
					filter
					showClear
					filterBy="name"
					placeholder="Select your Country"
					valueTemplate={selectedCountryTemplate}
					itemTemplate={countryOptionTemplate}
					className={classNames({
						"p-invalid": props.isFormFieldValid(
							props.countryCodeName
						),
					})}
				/>
				<InputText
					placeholder="Mobile Number"
					keyfilter="pint"
					maxLength="10"
					name={props.mobileNumberName}
					value={props.mobileNumberValue}
					onChange={props.handleChange}
					className={classNames({
						"p-invalid": props.isFormFieldValid(
							props.mobileNumberName
						),
					})}
				/>
			</div>
			{props.countryCodeErrorMessage} {props.mobileNumberErrorMessage}
		</>
	);
};

export default CountryMobileNumber;
