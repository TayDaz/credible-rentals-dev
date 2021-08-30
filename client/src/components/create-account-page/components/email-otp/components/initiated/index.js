import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
	otpCode: yup
		.string()
		.required("OTP code is required")
		.min(6, "OTP code must be of 6 digits"),
});

const Initiated = (props) => {
	const formik = useFormik({
		initialValues: {
			otpCode: "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			// console.log(values.otpCode);

			// props.registerUser(userInfo);
			// props.registerUser(values);
			props.submitEmailOtp(values.otpCode);
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
				<div className="p-col-12 p-mb-2">
					We have sent an OTP to Email:{" "}
					{<span className="p-text-bold">{props.email}</span>}
				</div>

				<div className="p-col-12">Please enter the OTP below</div>
			</div>
			<div className="p-fluid p-grid p-justify-center">
				<div className="p-field p-col-12 p-md-4 p-lg-4 p-mb-2">
					<InputText
						name="otpCode"
						keyfilter="pint"
						maxLength="6"
						value={formik.values.otpCode}
						onChange={formik.handleChange}
						className={classNames("p-inputtext-sm", {
							"p-invalid": isFormFieldValid("otpCode"),
						})}
					/>
					{getFormErrorMessage("otpCode")}
				</div>
			</div>
			<div className="p-fluid p-grid p-justify-center">
				<div className="p-col-12 p-md-4 p-lg-4  p-mb-2">
					<Button label="Submit" type="submit" />
				</div>
			</div>
		</form>
	);
};

export default Initiated;
