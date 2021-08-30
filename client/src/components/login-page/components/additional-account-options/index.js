import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

const AdditionalAccountOptions = (props) => {
	const handleOnChange = (e) => {
		props.toggleKeepMeSignedIn(e.checked);
	};

	return (
		<div className="p-grid p-fluid p-justify-center">
			<div className="p-col-12 p-md-10 p-lg-10 p-grid p-justify-between">
				<div className="p-col-6 p-field-checkbox">
					<Checkbox
						inputId="keepMeSignedIn"
						checked={props.keepMeSignedIn}
						onChange={handleOnChange}
					/>
					<label htmlFor="binary">Keep me signed in</label>
				</div>
				<div className="p-col-6 p-md-5 p-lg-5 p-text-right">
					<Button
						label="Forgot Password?"
						className="p-button-secondary p-button-text p-text-right"
						onClick={props.routeToForgotPassword}
					/>
				</div>
			</div>
		</div>
	);
};

export default AdditionalAccountOptions;
