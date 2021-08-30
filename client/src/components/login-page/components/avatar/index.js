import { Avatar } from "primereact/avatar";
import portfolio from "../../assets/images/portfolio.jpg";
import "./styles.scss";

const LoginPageAvatar = (props) => {
	return (
		<div className="p-col-10 p-md-4 p-lg-4">
			<div className="avatar__wrapper">
				<img
					src={portfolio}
					alt="Login Page Avatar"
					style={{ width: "150px" }}
					className="image"
				/>
			</div>
		</div>
	);
};

export default LoginPageAvatar;
