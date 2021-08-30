import { Button } from "primereact/button";

const Initiator = (props) => {
	const handleSubmitPasswordChange = () => {
		props.submitPasswordChange();
	};

	return (
		<div className="p-grid p-fluid p-justify-center">
			<div className="p-col-12 p-text-center">
				<i
					className="pi pi-info-circle"
					style={{ fontSize: "5rem", color: "var(--orange-400)" }}
				></i>
			</div>
			<div
				className="p-col-12 p-text-center"
				style={{ fontSize: "1.2rem", color: "var(--orange-400)" }}
			>
				You are about to change your password!
			</div>
			<div className="p-col-12 p-text-justify">
				<small>
					This will require you to verify through email. Please click
					on next to proceed else press the cross button at the top or
					the cancel button at the bottom.
				</small>
			</div>
			<div className="p-col-6 p-md-4 p-lg-4">
				<Button label="Next" onClick={handleSubmitPasswordChange} />
			</div>
		</div>
	);
};

export default Initiator;
