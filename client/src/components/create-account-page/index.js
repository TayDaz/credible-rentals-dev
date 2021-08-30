import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import View from "./view";
import makeApiCall from "../../helpers/makeApiCall";
import { url } from "../../config";
import {
	EMAIL,
	LOCAL,
	SMS_OTP,
	PENDING,
	INITIATED,
	SUCCESS,
	FAILURE,
	VERIFIED,
} from "../../constants";
import {
	logoutUser,
	userProfileUpdateRequest,
	userProfileUpdateSuccess,
	userProfileUpdateFailure,
	userProfileDataUpdateRequest,
	userProfileDataUpdateSuccess,
	userProfileDataUpdateFailure,
	userProfileClearDataAfterSuccessfullSignupVerification,
	createAccountUserSubmitFormRequest,
	createAccountUserSubmitFormSuccess,
	createAccountUserSubmitFormFailure,
	createAccountUserSubmitSmsOtpRequest,
	createAccountUserSubmitSmsOtpSuccess,
	createAccountUserSubmitSmsOtpFailure,
	createAccountUserSubmitEmailOtpRequest,
	createAccountUserSubmitEmailOtpSuccess,
	createAccountUserSubmitEmailOtpFailure,
} from "../../redux";

const CreateAccountPage = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const token = user.data?.token;
	const createAccount = useSelector((state) => state.createAccount);

	const handleLogin = () => {
		if (user.data) {
			dispatch(logoutUser());
		}

		history.push("/login");
		//dispatch logout user
	};

	const handleRegisterUserLocal = async (userData) => {
		console.log("[CreateAccount/.js] handleRegisterUser", userData);

		let res, resJson;
		// dispatch(userProfileUpdateRequest());
		dispatch(createAccountUserSubmitFormRequest());
		try {
			res = await makeApiCall.post(url.signup, {}, userData);
			resJson = await res.json();
		} catch (err) {
			console.error("[CreateAccount/.js] handleRegisterUser");
			dispatch(createAccountUserSubmitFormFailure("Server Error"));
		}

		if (res.status === 200) {
			if (resJson.status === SUCCESS) {
				dispatch(createAccountUserSubmitFormSuccess(resJson.data));
			} else if (resJson.status === FAILURE)
				// dispatch(userProfileUpdateFailure());
				dispatch(createAccountUserSubmitFormFailure(resJson.message));
		} else {
			dispatch(createAccountUserSubmitFormFailure("Server error"));
		}
	};

	const handleRegisterUserSocial = async (userData) => {
		console.log("[CreateAccount/.js] handleRegisterUser", userData);

		let res, resJson;
		// dispatch(userProfileDataUpdateRequest());
		dispatch(createAccountUserSubmitFormRequest());
		try {
			res = await makeApiCall.post(url.signup, { token }, userData);
			resJson = await res.json();
		} catch (err) {
			console.error("[CreateAccount/.js] handleRegisterUserSocial()");
			dispatch(createAccountUserSubmitFormFailure("Server Error"));
		}

		// if (resJson.status === SUCCESS) {
		// 	dispatch(userProfileDataUpdateSuccess(resJson.data));
		// }
		if (res.status === 200) {
			if (resJson.status === SUCCESS) {
				// dispatch(userProfileDataUpdateSuccess(resJson.data));
				dispatch(createAccountUserSubmitFormSuccess(resJson.data));
			} else if (resJson.status === FAILURE) {
				// dispatch(userProfileDataUpdateFailure());
				dispatch(createAccountUserSubmitFormFailure(resJson.message));
			}
		} else {
			dispatch(createAccountUserSubmitFormFailure("Server Error"));
		}
	};

	const handleSubmitSmsOtp = async (otpCode) => {
		console.log("[CreateAccount/.js] submitOtpHandler token");
		// dispatch(userProfileDataUpdateRequest());
		dispatch(createAccountUserSubmitSmsOtpRequest());
		let res, resJson;
		try {
			res = await makeApiCall.post(url.signup, { token }, { otpCode });
			resJson = await res.json();
		} catch (err) {
			console.error("[CreateAccount/.js] handleSubmitOtp() ", err);
			// dispatch(userProfileDataUpdateFailure());
			dispatch(createAccountUserSubmitSmsOtpFailure("Server error"));
		}

		if (res.status === 200) {
			if (resJson.status === SUCCESS) {
				// dispatch(userProfileDataUpdateSuccess(resJson.data));
				dispatch(createAccountUserSubmitSmsOtpSuccess(resJson.data));
			} else if (resJson.status === FAILURE) {
				// dispatch(userProfileDataUpdateFailure());
				dispatch(createAccountUserSubmitSmsOtpFailure(resJson.message));
			}
		} else {
			dispatch(createAccountUserSubmitSmsOtpFailure("Server error"));
		}
	};

	const handleSubmitEmailOtp = async (otpCode) => {
		console.log("[CreateAccount/.js] submitOtpHandler token");
		// dispatch(userProfileDataUpdateRequest());
		dispatch(createAccountUserSubmitEmailOtpRequest());
		let res, resJson;
		try {
			res = await makeApiCall.post(url.signup, { token }, { otpCode });
			resJson = await res.json();
		} catch (err) {
			console.error("[CreateAccount/.js] handleSubmitOtp() ", err);
			// dispatch(userProfileDataUpdateFailure());
			dispatch(createAccountUserSubmitEmailOtpFailure("Server Error"));
		}

		if (res.status === 200) {
			if (resJson.status === SUCCESS) {
				dispatch(createAccountUserSubmitEmailOtpSuccess(resJson.data));
			} else if (resJson.status === FAILURE) {
				dispatch(
					createAccountUserSubmitEmailOtpFailure(resJson.message)
				);
			}
		} else {
			dispatch(createAccountUserSubmitEmailOtpFailure("Server error"));
		}

		// if (resJson.status === SUCCESS) {
		// 	dispatch(userProfileDataUpdateSuccess(resJson.data));
		// 	if (
		// 		resJson.data?.signupStatus === VERIFIED &&
		// 		resJson.data?.emailAuthStatus === VERIFIED
		// 	) {
		// 		dispatch(
		// 			userProfileClearDataAfterSuccessfullSignupVerification()
		// 		);
		// 	}
		// } else if (resJson.status === FAILURE) {
		// 	dispatch(userProfileDataUpdateFailure());
		// }
	};

	return (
		<View
			login={handleLogin}
			registerUserLocal={handleRegisterUserLocal}
			registerUserSocial={handleRegisterUserSocial}
			submitSmsOtp={handleSubmitSmsOtp}
			submitEmailOtp={handleSubmitEmailOtp}
		/>
	);
	// return (
	// 	<View
	// 		login={handleLogin}
	// 		provider={user.data?.provider}
	// 		firstName={user.data?.firstName}
	// 		lastName={user.data?.lastName}
	// 		signupStatus={user.data?.signupStatus}
	// 		smsAuthStatus={user.data?.smsAuthStatus}
	// 		emailAuthStatus={user.data?.emailAuthStatus}
	// 		mobileNumber={user.data?.mobileNumber}
	// 		email={user.data?.email}
	// 		registerUserLocal={handleRegisterUserLocal}
	// 		registerUserSocial={handleRegisterUserSocial}
	// 		submitSmsOtp={handleSubmitSmsOtp}
	// 		submitEmailOtp={handleSubmitEmailOtp}
	// 	/>
	// );
};

export default CreateAccountPage;
