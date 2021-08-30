import Initiated from "./components/initiated";
import Pending from "./components/pending";
import { PENDING, INITIATED } from "../../../../constants";

const viewMap = {
	[PENDING]: Pending,
	[INITIATED]: Initiated,
};

const SmsOtp = (props) => {
	const Screen = viewMap[props.smsAuthStatus || PENDING];

	return <Screen {...props} />;
};

export default SmsOtp;
