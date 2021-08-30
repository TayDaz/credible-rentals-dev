import { Steps } from "primereact/steps";
import { EMAIL, INITIATED, SMS_OTP, VERIFIED } from "../../../../constants";

const items = [
	{ label: "Form", id: INITIATED, indx: 0 },
	{ label: "Mobile", id: SMS_OTP, indx: 1 },
	{ label: "Email", id: EMAIL, indx: 2 },
	{ label: "Confirmation", id: VERIFIED, indx: 3 },
];

const SignupStatusSteps = (props) => {
	const activeIndexObj = items.find((ele) => ele.id === props.signupStatus);
	console.log("[signup-status-steps] activeIndexObj", activeIndexObj);

	return (
		<Steps
			model={items}
			activeIndex={activeIndexObj ? activeIndexObj.indx : 0}
			readOnly={true}
		/>
	);
};

export default SignupStatusSteps;
