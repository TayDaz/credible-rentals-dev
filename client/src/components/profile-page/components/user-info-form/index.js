import { useState } from "react";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from "primereact/button";

// import { useFormik } from "formik";
// import * as Yup from "yup";

const UserInfoForm = (props) => {
	const [isDisabled, setIsDisabled] = useState(true);

	// const formik = useFormik({
	// 	enableReinitialize: true,
	// 	initialValues: {
	// 		firstName: props?.firstName || null,
	// 		lastName: props?.lastName || null,
	// 		username: props?.username || null,
	// 		email: props?.email || null,
	// 		residenceAddress: props?.residenceAddress || null,
	// 	},
	// 	validationSchema: Yup.object({
	// 		firstName: Yup.string()
	// 			.required("First Name Required")
	// 			.min(1, "First Name must contain atlease one character"),
	// 		lastName: Yup.string().required("Last Name is Required"),
	// 		username: Yup.string()
	// 			.required("UserName is Required")
	// 			.min(1, "Username must be more than or equal to 5 characters"),
	// 		email: Yup.string().email().required("E-Mail is Required"),
	// 		residenceAddress: Yup.string().required(
	// 			"Residence Address is Required"
	// 		),
	// 	}),
	// 	onSubmit: (values) => {
	// 		// console.log(JSON.stringify(values, null, 2));
	// 		props.updateUserDetails(values);
	// 	},
	// });
	const {
		firstName,
		lastName,
		username,
		email,
		mobileNumber,
		residenceAddress,
	} = props;

	const [form, setForm] = useState({
		initialValues: {
			firstName,
			lastName,
			username,
			email,
			mobileNumber,
			residenceAddress,
		},
		values: {
			firstName,
			lastName,
			username,
			email,
			mobileNumber,
			residenceAddress,
		},
	});

	// const handleFormChange = (e) => {
	// 	if (
	// 		["firstName", "lastName", "residenceAddress"].includes(
	// 			e.target.name
	// 		)
	// 	) {
	// 		if (e.target.value !== "") {

	// 		} else {
	// 			const updatedValues = {
	// 				...form,
	// 				values: {
	// 					...form.values,
	// 					[e.target.name]: form.initialValues[e.target.name],
	// 				},
	// 			};
	// 			setForm({ ...form, values: updatedValues });
	// 		}
	// 	}
	// };

	const handleOnClose = (fieldName) => {
		let updatedValues;
		switch (fieldName) {
			case "firstName":
				if (form.values.firstName === "") {
					updatedValues = {
						...form.values,
						firstName: form.initialValues.firstName,
					};
					setForm({ ...form, values: updatedValues });

					// props.updateUserInfo({
					// 	firstName: updatedValues.firstName,
					// });
				} else if (
					form.values.firstName !== form.initialValues.firstName
				) {
					props.updateUserInfo({ firstName: form.values.firstName });
				}
				break;
			case "lastName":
				if (form.values.lastName === "") {
					updatedValues = {
						...form.values,
						lastName: form.initialValues.lastName,
					};
					setForm({ ...form, values: updatedValues });
				} else if (
					form.values.lastName !== form.initialValues.lastName
				) {
					props.updateUserInfo({ lastName: form.values.lastName });
				}
				break;
			case "residenceAddress":
				if (form.values.residenceAddress === "") {
					updatedValues = {
						...form.values,
						residenceAddress: form.initialValues.residenceAddress,
					};
					setForm({ ...form, values: updatedValues });
				} else if (
					form.values.residenceAddress !==
					form.initialValues.residenceAddress
				) {
					props.updateUserInfo({
						residenceAddress: form.values.residenceAddress,
					});
				}
				break;
		}
	};

	const handleChange = (e) => {
		const updatedValues = {
			...form,
			values: { ...form.values, [e.target.name]: e.target.value },
		};
		setForm(updatedValues);
	};

	console.log("[profile-page/user-info-form/.js] form", form);

	return (
		<div className="p-col-12 p-md-8 p-lg-8">
			<div className="p-fluid p-formgrid p-grid">
				<div className="p-field p-col-6 p-md-6 p-lg-6">
					<label htmlFor="firstName" className="p-text-bold">
						First Name
					</label>
					<Inplace
						closable
						onClose={() => handleOnClose("firstName")}
					>
						<InplaceDisplay>{firstName || null}</InplaceDisplay>
						<InplaceContent>
							<InputText
								name="firstName"
								value={form.values.firstName}
								onChange={handleChange}
								autoFocus
							/>
						</InplaceContent>
					</Inplace>
				</div>
				<div className="p-field p-col-6 p-md-6 p-lg-6">
					<label htmlFor="lastName" className="p-text-bold">
						Last Name
					</label>
					<Inplace closable onClose={() => handleOnClose("lastName")}>
						<InplaceDisplay>{lastName || null}</InplaceDisplay>
						<InplaceContent>
							<InputText
								name="lastName"
								value={form.values.lastName}
								onChange={handleChange}
								autoFocus
							/>
						</InplaceContent>
					</Inplace>
				</div>
				<div className="p-field p-col-6 p-md-6 p-lg-6">
					<label htmlFor="username" className="p-text-bold">
						Username
					</label>
					<Inplace disabled>
						<InplaceDisplay>{username || null}</InplaceDisplay>
						<InplaceContent>
							<InputText
								name="username"
								value={form.values.username}
								// onChange={handleChange}
								disabled
								autoFocus
							/>
						</InplaceContent>
					</Inplace>
				</div>
				<div className="p-field p-col-6 p-md-6 p-lg-6">
					<label htmlFor="mobileNumber" className="p-text-bold">
						Mobile
					</label>
					<Inplace disabled>
						<InplaceDisplay>{mobileNumber || null}</InplaceDisplay>
						<InplaceContent>
							<InputText
								name="mobileNumber"
								value={form.values.mobileNumber}
								// onChange={handleChange}
								disabled
								autoFocus
							/>
						</InplaceContent>
					</Inplace>
				</div>
				<div className="p-field p-col-12 p-md-12 p-lg-12">
					<label htmlFor="email" className="p-text-bold">
						Email
					</label>
					<Inplace disabled>
						<InplaceDisplay>{email || null}</InplaceDisplay>
						<InplaceContent>
							<InputText
								name="email"
								value={form.values.email}
								onChange={handleChange}
								autoFocus
							/>
						</InplaceContent>
					</Inplace>
				</div>
				<div className="p-field p-col-12 p-md-12 p-lg-12">
					<label htmlFor="residenceAddress" className="p-text-bold">
						Address
					</label>
					<Inplace
						closable
						onClose={() => handleOnClose("residenceAddress")}
					>
						<InplaceDisplay>
							{residenceAddress || null}
						</InplaceDisplay>
						<InplaceContent>
							{/* <InputText
								name="residenceAddress"
								value={form.values.residenceAddress}
								onChange={handleChange}
								autoFocus
							/> */}
							<InputTextarea
								id="address"
								type="text"
								rows="2"
								name="residenceAddress"
								value={form.values.residenceAddress}
								onChange={handleChange}
							/>
						</InplaceContent>
					</Inplace>
				</div>
				{/* <div className="p-col-12 p-md-4 p-lg-4">
					<div className="p-grid p-justify-end">
						<div className="p-col-6">
							<Button label="Cancel" />
						</div>

						<div className="p-col-6">
							<Button label="Save" />
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default UserInfoForm;
