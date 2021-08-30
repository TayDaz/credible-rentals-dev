import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
	password: yup
		.string()
		.min(8, "The password must be atleast 8 dgits")
		.required("Password is required"),
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
});

const header = <h6>Pick a password</h6>;
const footer = (
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

const UpdatePassword = (props) => {
	const formik = useFormik({
		initialValues: { password: "", confirmPassword: "" },
		validationSchema: schema,
		onSubmit: (value) => {
			console.log("[forgot-password/initiator/.js] value", value);
			props.updatePassword(value);
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
				Please enter the OTP you received in your registered Email
			</div>

			<form
				onSubmit={formik.handleSubmit}
				className="p-col-12 p-grid p-fluid p-jc-center p-ai-center p-mt-4"
			>
				<div className="p-grid p-fluid p-formgrid p-justify-center">
					<div className="p-field p-col-12 p-md-6 p-lg-6 p-mb-4">
						<span className="p-float-label">
							<Password
								id="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								className={classNames({
									"p-invalid": isFormFieldValid("password"),
								})}
								header={header}
								footer={footer}
								toggleMask
							/>
							<label htmlFor="password">Password</label>
						</span>
						{getFormErrorMessage("password")}
					</div>

					<div className="p-field p-col-12 p-md-6 p-lg-6">
						<span className="p-float-label">
							<Password
								id="confirmPassword"
								name="confirmPassword"
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								className={classNames({
									"p-invalid":
										isFormFieldValid("confirmPassword"),
								})}
								feedback={false}
							/>
							<label htmlFor="confirmPassword">
								Confirm Password
							</label>
						</span>
						{getFormErrorMessage("confirmPassword")}
					</div>

					<div className="p-col-12 p-md-4 p-lg-4">
						<Button label="Submit" type="submit" />
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdatePassword;
