import { Button } from "primereact/button";

const Pending = (props) => {
	const handleOnClick = () => {
		props.submitSmsOtp();
	};
	return (
		<>
			<div className="p-fluid p-grid p-justify-center">
				<div className="p-col-12">
					You will recive an OTP to Mobile Number:{" "}
					{<span className="p-text-bold">{props.mobileNumber}</span>}
				</div>
			</div>
			<div className="p-fluid p-grid p-justify-center">
				<div className="p-col-12">Please click on next to continue</div>
			</div>
			<div className="p-fluid p-grid p-justify-center">
				<div className="p-col-12 p-md-4 p-lg-4">
					<Button label="Next" onClick={handleOnClick} />
				</div>
			</div>
		</>
	);
};

export default Pending;
