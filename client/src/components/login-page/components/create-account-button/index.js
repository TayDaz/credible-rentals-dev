import { Button } from "primereact/button";

const CreateAccountButton = (props) => {
	return (
		<div className="p-fluid p-grid p-justify-center">
			<div className="p-col-6 p-md-4 p-lg-4">
				<Button label="Create Account" onClick={props.createAccount} />
			</div>
		</div>
	);
};

export default CreateAccountButton;
