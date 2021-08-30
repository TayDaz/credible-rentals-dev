import Pending from "./components/pending";
import Initiated from "./components/initiated";
import { PENDING, INITIATED } from "../../../../constants";

const viewMap = {
	PENDING: Pending,
	INITIATED: Initiated,
};

const EmailOtp = (props) => {
	const Screen = viewMap[props.emailAuthStatus || PENDING];

	return <Screen {...props} />;
};

export default EmailOtp;
