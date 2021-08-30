import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email id")
		.required("Email ID is required"),
});

const Initiator = (props) => {
	const formik = useFormik({
		initialValues: { email: "" },
		validationSchema: schema,
		onSubmit: (value) => {
			console.log("[forgot-password/initiator/.js] value", value);
			props.checkEmailId(value.email);
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
		<div className="p-grid p-fluid p-justify-center p-align-center">
			<h3>Forgot Password</h3>
			<div className="p-col-12 p-text-center">
				Please enter your email below
			</div>

			<form
				onSubmit={formik.handleSubmit}
				className="p-col-12 p-grid p-fluid p-jc-center p-ai-center"
			>
				<div className="p-field p-col-12 p-md-12 p-lg-12 p-text-center">
					{getFormErrorMessage("email")}
				</div>
				<div className="p-field p-col-12 p-md-6 p-lg-6">
					<span className="p-float-label">
						<InputText
							id="email"
							type="email"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							className={classNames({
								"p-invalid": isFormFieldValid("email"),
							})}
						/>
						<label htmlFor="email">Email</label>
					</span>
				</div>
				<div className="p-field p-col-12 p-md-4 p-lg-4">
					<Button label="Submit" type="submit" />
				</div>
			</form>
		</div>
	);
};

export default Initiator;
