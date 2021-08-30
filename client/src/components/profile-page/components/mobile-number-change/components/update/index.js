import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as yup from "yup";
import CountryMobileNumber from "../../../../../../shared-components/country-mobile-number";

const schema = yup.object().shape({
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
});

const UpdatePassword = (props) => {
	const formik = useFormik({
		initialValues: { countryCode: null, mobileNumber: "" },
		validationSchema: schema,
		onSubmit: ({ countryCode, mobileNumber }) => {
			console.log(
				"[forgot-password/initiator/.js] value",
				countryCode.dialCode + mobileNumber
			);
			props.submitMobileNumberChange({
				mobileNumber: countryCode.dialCode + mobileNumber,
			});
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
			className="p-grid p-fluid p-justify-center p-mt-4"
		>
			<div className="p-col-12 p-text-center p-text-bold">
				Please select your country code and enter your new mobile number
			</div>
			{/* <div className="p-col-12 p-grid p-fluid p-formgrid p-justify-center"> */}
			<div className="p-field p-col-12 p-md-6 p-lg-6">
				<CountryMobileNumber
					countryCodeName="countryCode"
					mobileNumberName="mobileNumber"
					countryCodeValue={formik.values.countryCode}
					mobileNumberValue={formik.values.mobileNumber}
					countryCodeErrorMessage={getFormErrorMessage("countryCode")}
					mobileNumberErrorMessage={getFormErrorMessage(
						"mobileNumber"
					)}
					handleChange={formik.handleChange}
					isFormFieldValid={isFormFieldValid}
				/>
			</div>
			{/* </div> */}

			<div className="p-col-12 p-md-4 p-lg-4">
				<Button label="Submit" type="submit" />
			</div>
		</form>
	);
};

export default UpdatePassword;
