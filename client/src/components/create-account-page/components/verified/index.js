import { Button } from "primereact/button";
import "./styles.scss";

const Verified = (props) => {
	return (
		<div className="p-grid p-fluid p-justify-center">
			<div className="p-col-12 p-text-center">
				<i
					className="pi pi-check-circle"
					style={{ fontSize: "5rem", color: "var(--green-500)" }}
				></i>
			</div>
			<div className="p-col-12 p-text-center">
				<span className="create-account__verified__message">
					You have been successfully verified!
				</span>
			</div>
			<div className="p-col-12 p-text-center">
				We have logged you out for security reasons. Please login again
				to continue
			</div>
			<div className="p-col-4">
				<Button
					label="Login"
					onClick={props.login}
					className="p-button-sm"
				/>
			</div>
		</div>
	);
};

export default Verified;
