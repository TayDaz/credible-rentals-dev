import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
	challengeCode: yup
		.string()
		.length(6, "The OTP code must be of 6 digits")
		.required("OTP code is required"),
});

const Initiated = (props) => {
	const formik = useFormik({
		initialValues: { challengeCode: "" },
		validationSchema: schema,
		onSubmit: (value) => {
			// console.log("[password-change/initiated/.js] value", value);
			props.submitMobileNumberChange(value);
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
		<form
			onSubmit={formik.handleSubmit}
			className="p-col-12 p-grid p-fluid p-justify-center"
		>
			<div className="p-col-12 p-text-center">
				An OTP has been sent to your new mobile number (
				<b>{props.newMobileNumber}</b>). Please enter it below.
			</div>
			<div className="p-field p-col-12 p-md-12 p-lg-12 p-text-center">
				{getFormErrorMessage("challengeCode")}
			</div>
			<div className="p-field p-col-12 p-md-6 p-lg-6">
				<span className="p-float-label">
					<InputText
						id="challengeCode"
						type="text"
						name="challengeCode"
						value={formik.values.challengeCode}
						onChange={formik.handleChange}
						className={classNames({
							"p-invalid": isFormFieldValid("challengeCode"),
						})}
					/>
					<label htmlFor="challengeCode">OTP</label>
				</span>
			</div>
			<div className="p-field p-col-6 p-md-4 p-lg-4">
				<Button label="Submit" type="submit" />
			</div>
		</form>
	);
};

export default Initiated;
