import LocalForm from "./components/local-form";
import SocialForm from "./components/social-form";
import { LOCAL, SOCIAL } from "../../../../constants";

const viewMap = {
	[LOCAL]: LocalForm,
	[SOCIAL]: SocialForm,
};
const SignupForms = (props) => {
	console.log("props.provider || LOCAL", props.provider || LOCAL);
	const provider = props.provider;
	let view = LOCAL;
	if (provider) {
		view = SOCIAL;
	} else {
		view = LOCAL;
	}
	const Screen = viewMap[view];

	return <Screen {...props} />;
};

export default SignupForms;
