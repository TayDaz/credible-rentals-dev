import { useSelector } from "react-redux";
import { Divider } from "primereact/divider";
import Wrapper from "./components/wrapper";
import Title from "./components/title";
import Greeting from "./components/greeting";
import LoginForm from "./components/login-form";
import Avatar from "./components/avatar";
import CreateAccountButton from "./components/create-account-button";
import SocialLoginButtons from "./components/social-login-buttons";
import "./styles.scss";

const View = (props) => {
	const login = useSelector((state) => state.login);

	return (
		<Wrapper>
			<div className="p-fluid p-grid p-justify-center">
				<Title />
				<Greeting />
				<Avatar />
			</div>
			<LoginForm
				submit={props.submit}
				hasCredentialsError={login.hasCredentialsError}
				credentialsErrorMessage={login.credentialsErrorMessage}
				routeToForgotPassword={props.routeToForgotPassword}
				keepMeSignedIn={props.keepMeSignedIn}
				toggleKeepMeSignedIn={props.toggleKeepMeSignedIn}
			/>
			<div className="p-fluid p-formgrid p-grid p-justify-center">
				<div className="p-col-6 p-md-4 p-lg-4">
					<Divider align="center" type="dashed">
						<small>OR</small>
					</Divider>
				</div>
			</div>

			<CreateAccountButton createAccount={props.createAccount} />
			<SocialLoginButtons socialLogin={props.socialLogin} />
		</Wrapper>
	);
};

export default View;
