import { useEffect } from "react";

const Success = (props) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			props.cancelPasswordChange();
		}, 5000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="p-grid p-fluid">
			<div className="p-col-12 p-text-center">
				<i
					className="pi pi-check-circle"
					style={{ fontSize: "5rem", color: "var(--green-500)" }}
				></i>
			</div>
			<div
				className="p-col-12 p-text-center p-text-bold"
				style={{ fontSize: "1.2rem" }}
			>
				Password Changed Successfully
			</div>
			<div className="p-col-12 p-text-center">
				Please close this window else it will automatically close in 5
				seconds.
			</div>
		</div>
	);
};

export default Success;
