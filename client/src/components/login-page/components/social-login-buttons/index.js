import { Button } from "primereact/button";
import { FACEBOOK, GOOGLE, TWITTER } from "../../../../constants";

const SocialLoginButtons = (props) => {
	const handleSocialLogin = (name) => {
		// console.log(
		// 	"[login-page/social-login-buttons/.js] handleSocialLogin name",
		// 	name
		// );
		props.socialLogin(name);
	};

	return (
		<div className="p-fluid p-grid p-justify-center">
			<div className="p-col-12 p-md-6 p-lg-6">
				<div className="p-grid p-justify-around">
					<div className="p-col-3 p-text-center">
						<Button
							icon="pi pi-facebook"
							className="p-button-rounded p-button-primary"
							name={FACEBOOK}
							onClick={() => handleSocialLogin(FACEBOOK)}
						/>
					</div>
					<div className="p-col-3 p-text-center">
						<Button
							icon="pi pi-google"
							className="p-button-rounded p-button-danger"
							name={GOOGLE}
							onClick={() => handleSocialLogin(GOOGLE)}
						/>
					</div>
					<div className="p-col-3 p-text-center">
						<Button
							icon="pi pi-twitter"
							className="p-button-rounded p-button-info"
							name={TWITTER}
							onClick={() => handleSocialLogin(TWITTER)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SocialLoginButtons;
