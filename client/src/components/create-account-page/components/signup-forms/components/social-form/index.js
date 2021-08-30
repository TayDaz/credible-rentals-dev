import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

import CountryMobileNumber from "../../../../../../shared-components/country-mobile-number";

const passwordFooter = (
	<>
		<Divider />
		<p className="p-mt-2">Suggestions</p>
		<ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
			<li>At least one lowercase</li>
			<li>At least one uppercase</li>
			<li>At least one numeric</li>
			<li>Minimum 8 characters</li>
		</ul>
	</>
);

const schema = yup.object().shape({
	firstName: yup.string().required("First Name is required"),
	lastName: yup.string().required("Last Name is required"),
	email: yup
		.string()
		.email("Please enter a valid email id")
		.required("Email is required"),
	residenceAddress: yup.string().required("Residence Address is required"),
	countryCode: yup
		.object({
			name: yup.string(),
			code: yup.string(),
			dialCode: yup.string(),
		})
		.nullable()
		.required("Country Code is required"),
	mobileNumber: yup
		.string()
		.required("Mobile Number is a required")
		.length(10, "Mobile Number must be of 10 digits"),
	agreeToTerms: yup.bool().required().oneOf([true], "Terms must be accepted"),
	promotions: yup.bool(),
});

const SocialForm = (props) => {
	const formik = useFormik({
		initialValues: {
			firstName: props?.firstName || "",
			lastName: props?.lastName || "",
			email: props?.email || "",
			countryCode: null,
			mobileNumber: "",
			residenceAddress: "",
			agreeToTerms: true,
			promotions: true,
		},
		validationSchema: schema,
		onSubmit: (values) => {
			// console.log(JSON.stringify(values, null, 2));
			const {
				firstName,
				lastName,
				email,
				countryCode,
				mobileNumber,
				residenceAddress,
				agreeToTerms,
				promotions,
			} = values;
			const userInfo = {
				firstName,
				lastName,
				email,
				residenceAddress,
				mobileNumber: countryCode.dialCode + mobileNumber,
				agreeToTerms,
				promotions,
			};
			console.log(userInfo);
			props.registerUserSocial(userInfo);
			// props.registerUser(userInfo);
			// props.registerUser(values);
		},
	});
	const isFormFieldValid = (name) =>
		!!(formik.touched[name] && formik.errors[name]);
	const getFormErrorMessage = (name) => {
		return (
			isFormFieldValid(name) && (
				<small className="p-error">{formik.errors[name]}</small>
			)
		);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-field p-col-12 p-md-6 p-mb-2">
					<InputText
						id="firstName"
						name="firstName"
						type="text"
						value={formik.values.firstName}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("firstName"),
						})}
						disabled={formik.initialValues.firstName}
						placeholder="First Name"
					/>
					{getFormErrorMessage("firstName")}
				</div>
				<div className="p-field p-col-12 p-md-6 p-mb-2">
					<InputText
						name="lastName"
						type="text"
						placeholder="Last Name"
						value={formik.values.lastName}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("lastName"),
						})}
						disabled={formik.initialValues.lastName}
					/>
					{getFormErrorMessage("lastName")}
				</div>
				<div className="p-field p-col-12 p-mb-2">
					<InputText
						name="email"
						type="email"
						placeholder="Email"
						value={formik.values.email}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("email"),
						})}
						disabled={formik.initialValues.email}
					/>
					{getFormErrorMessage("email")}
				</div>
				<div className="p-field p-col-12 p-mb-2">
					<InputText
						type="text"
						name="residenceAddress"
						placeholder="Residence Address"
						value={formik.values.residenceAddress}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("residenceAddress"),
						})}
					/>
					{getFormErrorMessage("residenceAddress")}
				</div>
				<div className="p-field p-col-12 p-mb-2">
					<CountryMobileNumber
						countryCodeName="countryCode"
						mobileNumberName="mobileNumber"
						countryCodeValue={formik.values.countryCode}
						mobileNumberValue={formik.values.mobileNumber}
						countryCodeErrorMessage={getFormErrorMessage(
							"countryCode"
						)}
						mobileNumberErrorMessage={getFormErrorMessage(
							"mobileNumber"
						)}
						handleChange={formik.handleChange}
						isFormFieldValid={isFormFieldValid}
					/>
				</div>
				<div className="p-field-checkbox  p-col-12 p-md-6  p-mb-2 p-justify-center">
					<Checkbox
						inputId="agreeToTerms"
						name="agreeToTerms"
						checked={formik.values.agreeToTerms}
						onChange={formik.handleChange}
						className={classNames({
							"p-invalid": isFormFieldValid("agreeToTerms"),
						})}
					/>
					<label
						htmlFor="agreeToTerms"
						className={classNames({
							"p-error": isFormFieldValid("agreeToTerms"),
						})}
					>
						I agree to the terms and conditions*
					</label>
				</div>
				<div className="p-field-checkbox p-col-12 p-md-6  p-mb-2 p-justify-center">
					<Checkbox
						inputId="promotions"
						name="promotions"
						checked={formik.values.promotions}
						onChange={formik.handleChange}
						className={classNames({
							"p-invalid": isFormFieldValid("promotions"),
						})}
					/>
					<label
						htmlFor="promotions"
						className={classNames({
							"p-error": isFormFieldValid("promotions"),
						})}
					>
						Signup for promotions
					</label>
				</div>
				<div className="p-field p-col-4">
					<Button type="submit" label="Submit" />
				</div>
				{/* <div className="p-col-12">
					<div className="p-text-bold">
						Already have an account? <a href="#">Login Here</a>
					</div>
				</div> */}
			</div>
		</form>
	);
};

export default SocialForm;
