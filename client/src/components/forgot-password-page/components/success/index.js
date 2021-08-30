import { Button } from "primereact/button";

const Success = (props) => {
	return (
		<div className="p-grid p-fluid p-justify-center p-align-items p-text-center">
			<div className="p-col-12">
				<i
					className="pi pi-check-circle"
					style={{ fontSize: "5rem", color: "var(--green-500)" }}
				></i>
			</div>
			<div className="p-col-12">
				You have successfully reset your password
			</div>
			<div className="p-col-12">
				Please click the below button to login with your new password.
			</div>
			<div className="p-col-12 p-grid p-fluid p-justify-center">
				<div className="p-col-12 p-md-4 p-lg-4">
					<Button label="Login" onClick={props.routeToLogin} />
				</div>
			</div>
		</div>
	);
};

export default Success;
