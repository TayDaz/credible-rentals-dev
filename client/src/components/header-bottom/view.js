import { useSelector } from "react-redux";
import ProfileLink from "./components/profile-link";
import "./styles.scss";

const View = (props) => {
	const user = useSelector((state) => state.user);

	return (
		<div className="p-grid header__wrapper">
			<div className="p-col-12 container p-grid p-justify-between p-align-center">
				<div className="p-col-2 heading_wrapper">Heading</div>
				<div className="p-col-3 links__wrapper">
					<div className="p-grid container p-text-center p-justify-between">
						<div className="p-col-4 item">My Orders</div>
						<div
							className="p-col-4 item"
							onClick={props.routeToUploadsPage}
						>
							Uploads
						</div>
						{user.isLoggedIn ? (
							<ProfileLink
								routeToUploadsPage={props.routeToUploadsPage}
								routeToProfilePage={props.routeToProfilePage}
								logoutUser={props.logoutUser}
							/>
						) : (
							<div
								className="p-col-4 item"
								onClick={props.routeToLoginPage}
							>
								Login
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default View;
