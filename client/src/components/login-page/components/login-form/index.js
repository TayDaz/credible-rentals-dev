import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

import "./styles.scss";

// const passwordFooter = (
// 	<>
// 		<Divider />
// 		<p className="p-mt-2">Suggestions</p>
// 		<ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
// 			<li>At least one lowercase</li>
// 			<li>At least one uppercase</li>
// 			<li>At least one numeric</li>
// 			<li>Minimum 8 characters</li>
// 		</ul>
// 	</>
// );

const schema = yup.object().shape({
	username: yup.string().required("Username is required"),

	password: yup.string().required("Password is required"),

	rememberMe: yup.bool(),
});

const LoginForm = (props) => {
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			// console.log(JSON.stringify(values, null, 2));
			// const {

			// 	username,
			// 	password,
			// 	confirmPassword,
			// 	email,
			// 	countryCode,
			// 	mobileNumber,
			// 	residenceAddress,
			// 	agreeToTerms,
			// 	promotions,
			// } = values;
			// const userInfo = {
			// 	firstName,
			// 	lastName,
			// 	username,
			// 	email,
			// 	password,
			// 	confirmPassword,
			// 	residenceAddress,
			// 	mobileNumber: countryCode + mobileNumber,
			// 	agreeToTerms,
			// 	promotions,
			// };
			console.log(values);

			props.submit(values);
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

	const handleKeepMeSignedIn = (e) => {
		props.toggleKeepMeSignedIn(e.checked);
	};

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="p-grid p-formgrid p-fluid p-justify-center"
		>
			{props.hasCredentialsError && (
				<div className="p-col-12 p-md-10 p-mb-2">
					<Message
						severity="error"
						text={props.credentialsErrorMessage}
					/>
				</div>
			)}
			<div className="p-field p-col-12 p-md-12 p-lg-12">
				<InputText
					id="username"
					type="text"
					placeholder="Username"
					name="username"
					value={formik.values.username}
					onChange={formik.handleChange}
					className={classNames({
						"p-invalid": isFormFieldValid("username"),
					})}
				/>
				{getFormErrorMessage("username")}
			</div>
			<div className="p-field p-col-12 p-md-12  p-lg-12">
				<Password
					toggleMask
					placeholder="Password"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					// footer={passwordFooter}
					className={classNames({
						"p-invalid": isFormFieldValid("password"),
					})}
					feedback={false}
				/>
				{getFormErrorMessage("password")}
			</div>
			<div className="p-col-12 p-grid p-md-12 p-lg-12 p-fluid p-justify-between">
				<div className="p-col-6 p-md-6 p-lg-6">
					<div className="p-field-checkbox">
						<Checkbox
							inputId="keepMeSignedIn"
							name="keepMeSignedIn"
							checked={props.keepMeSignedIn}
							onChange={handleKeepMeSignedIn}
						/>
						<label htmlFor="keepMeSignedIn">
							Keep me signed in
						</label>
					</div>
				</div>
				<div className="p-col-6 p-md-6 p-lg-6 p-d-flex p-jc-end">
					<span
						className="p-text-right login-form__forgot-password"
						onClick={props.routeToForgotPassword}
					>
						Forgot Password?
					</span>
					{/* <Button
						label="Forgot Password?"
						className="p-button-link"
						onClick={props.routeToForgotPassword}
					/> */}
				</div>
			</div>

			<div className="p-col-12 p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-col-6 p-md-4 p-lg-4">
					<Button type="submit" label="Login" />
				</div>
			</div>
		</form>
	);
	return (
		<form onSubmit={formik.handleSubmit}>
			{props.hasCredentialsError && (
				<div className="p-fluid p-formgrid p-grid p-justify-center">
					<div className="p-col-12 p-md-10 p-mb-2">
						<Message
							severity="error"
							text={props.credentialsErrorMessage}
						/>
					</div>
				</div>
			)}
			<div className="p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-field p-col-12 p-md-10 p-lg-10">
					<InputText
						id="username"
						type="text"
						placeholder="Username"
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
						className={classNames({
							"p-invalid": isFormFieldValid("username"),
						})}
					/>
					{getFormErrorMessage("username")}
				</div>
			</div>
			<div className="p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-field p-col-12 p-md-10  p-lg-10">
					<Password
						toggleMask
						placeholder="Password"
						name="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						// footer={passwordFooter}
						className={classNames({
							"p-invalid": isFormFieldValid("password"),
						})}
						feedback={false}
					/>
					{getFormErrorMessage("password")}
				</div>
			</div>
			<div className="p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-field p-col-12 p-grid p-md-10 p-lg-10 p-fluid p-align-center p-justify-between">
					<div className="p-col-6 p-md-5 p-lg-5">
						<div className="p-field-checkbox">
							<Checkbox
								inputId="keepMeSignedIn"
								name="keepMeSignedIn"
								checked={props.keepMeSignedIn}
								onChange={handleKeepMeSignedIn}
							/>
							<label htmlFor="keepMeSignedIn">
								Keep me signed in
							</label>
						</div>
					</div>
					<div className="p-field p-col-6 p-md-5 p-lg-5 p-text-right">
						<Button
							label="Forgot Password?"
							className="p-button-link"
							onClick={props.routeToForgotPassword}
						/>
					</div>
				</div>
			</div>

			<div className="p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-col-6 p-md-4 p-lg-4">
					<Button type="submit" label="Login" />
				</div>
			</div>
		</form>
	);
};

export default LoginForm;
