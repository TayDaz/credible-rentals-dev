import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

import CountryMobileNumber from "../../../../../../shared-components/country-mobile-number";

import "./styles.scss";

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
	username: yup.string().required("Username is required"),
	email: yup
		.string()
		.email("Please enter a valid email id")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
	confirmPassword: yup
		.string()
		.required("Confirm Password is required")
		.when("password", {
			is: (val) => (val && val.length > 0 ? true : false),
			then: yup
				.string()
				.oneOf(
					[yup.ref("password")],
					"Both password need to be the same"
				),
		}),
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

const LocalForm = (props) => {
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
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
				username,
				password,
				confirmPassword,
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
				username,
				email,
				password,
				confirmPassword,
				residenceAddress,
				mobileNumber: countryCode.dialCode + mobileNumber,
				agreeToTerms,
				promotions,
			};
			// console.log(userInfo);

			props.registerUserLocal(userInfo);
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

	const loginHandler = () => {
		props.login();
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
					/>
					{getFormErrorMessage("lastName")}
				</div>
				<div className="p-field p-col-12  p-md-6 p-lg-6 p-mb-2">
					<InputText
						name="username"
						type="text"
						placeholder="Username"
						value={formik.values.username}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("username"),
						})}
					/>
					{getFormErrorMessage("username")}
				</div>
				<div className="p-field p-col-12  p-md-6 p-lg-6 p-mb-2">
					<InputText
						name="email"
						type="email"
						placeholder="Email"
						value={formik.values.email}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("email"),
						})}
					/>
					{getFormErrorMessage("email")}
				</div>
				<div className="p-field p-col-12  p-md-6 p-lg-6 p-mb-2">
					<Password
						name="password"
						placeholder="Password"
						footer={passwordFooter}
						toggleMask
						value={formik.values.password}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("password"),
						})}
					/>
					{getFormErrorMessage("password")}
				</div>
				<div className="p-field p-col-12 p-md-6 p-lg-6 p-mb-2">
					<Password
						name="confirmPassword"
						placeholder="Confirm Password"
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("confirmPassword"),
						})}
						toggleMask
					/>
					{getFormErrorMessage("confirmPassword")}
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
				<div className="p-col-12">
					<div className="p-text-bold p-text-center">
						Already have an account?{" "}
						<span
							onClick={loginHandler}
							className="create-account-page__local-form__login-button"
						>
							Login Here
						</span>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LocalForm;
