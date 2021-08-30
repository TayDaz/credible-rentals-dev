import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { url } from "../../config";
import {
	BLOCKED,
	FACEBOOK,
	GOOGLE,
	TWITTER,
	VERIFIED,
	BLACKLISTED,
	SUCCESS,
	FAILURE,
} from "../../constants";
import makeApiCall from "../../helpers/makeApiCall";
import {
	userTokenLoginRequest,
	userTokenLoginSuccess,
	userTokenLoginSuccessSignupPending,
	userTokenLoginFailure,
	userLoginRequest,
	userLoginSuccess,
	userLoginSuccessSignupPending,
	userLoginFailure,
} from "../../redux";
import View from "./view";

const useQuery = () => new URLSearchParams(useLocation().search);

const LoginPage = (props) => {
	const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const login = useSelector((state) => state.login);
	const isPageLoading = login.isPageLoading;
	const isCredentialsSubmitLoading = login.isCredentialsSubmitLoading;

	let query = useQuery();
	const queryToken = query.get("token");
	const localToken = localStorage.getItem("token");

	useEffect(() => {
		console.log(
			"[login/.js] useEffect() queryToken, localToken",
			queryToken,
			localToken
		);
		const getUserData = async (token) => {
			let res, resJson;

			dispatch(userTokenLoginRequest());
			try {
				res = await makeApiCall.get(url.userProfile, { token });
				resJson = await res.json();
			} catch (err) {
				console.log(
					"[Authentication/.js] ERROR useEffect getUserProfile() apiCall"
				);
				dispatch(
					userTokenLoginFailure(
						"Error occurred while connecing to the server"
					)
				);
			}

			if (res.status === 200) {
				if (resJson.status === SUCCESS) {
					//signup pending and account not blocked
					//signup verified and account not blocked
					//account blocked

					//check if the user's signup is NOT complete
					if (
						resJson.data?.signupStatus !== VERIFIED &&
						![BLOCKED, BLACKLISTED].includes(
							resJson.data.accountStatus
						)
					) {
						dispatch(
							userTokenLoginSuccessSignupPending({
								...resJson.data,
								token,
							})
						);
						history.push("/create-account");
					} else if (
						resJson.data?.signupStatus === VERIFIED &&
						![BLOCKED, BLACKLISTED].includes(
							resJson.data?.accountStatus
						)
					) {
						dispatch(
							userTokenLoginSuccess({ ...resJson.data, token })
						);
						history.push("/");
					} else if (
						[BLOCKED, BLACKLISTED].includes(
							resJson.data?.accountStatus
						)
					) {
						dispatch(
							userTokenLoginFailure(
								"Your account has been blocked"
							)
						);
					}
				} else if (resJson.status === FAILURE) {
					dispatch(userTokenLoginFailure(resJson.message));
				}
			} else {
				dispatch(
					userTokenLoginFailure(
						"Error while connecting to the server"
					)
				);
			}
		};

		//if queryToken is present
		if (queryToken) {
			getUserData(queryToken);
		} else if (localToken) {
			getUserData(localToken);
		}
	});

	const handleKeepMeSignedIn = () => {
		setKeepMeSignedIn(!keepMeSignedIn);
	};

	const handleSubmit = async (credentials) => {
		dispatch(userLoginRequest());
		let res, resJson;
		try {
			res = await makeApiCall.post(url.login, {}, credentials);
			resJson = await res.json();
		} catch (err) {
			console.error("[login/.js] handleSubmit() ", err);
			dispatch(userLoginFailure("Error while connecting to the server"));
		}

		if (res.status === 200) {
			if (resJson.status === SUCCESS) {
				//signup pending and account not blocked
				//signup verified and account not blocked
				//account blocked

				//check if the user's signup is NOT complete
				if (
					resJson.data?.signupStatus !== VERIFIED &&
					![BLOCKED, BLACKLISTED].includes(resJson.data.accountStatus)
				) {
					dispatch(
						userLoginSuccessSignupPending({
							...resJson.data,
						})
					);
					history.push("/create-account");
				} else if (
					resJson.data?.signupStatus === VERIFIED &&
					![BLOCKED, BLACKLISTED].includes(
						resJson.data?.accountStatus
					)
				) {
					dispatch(userLoginSuccess({ ...resJson.data }));
					history.push("/");
				} else if (
					[BLOCKED, BLACKLISTED].includes(resJson.data?.accountStatus)
				) {
					dispatch(userLoginFailure("Your account has been blocked"));
				}
			} else if (resJson.status === FAILURE) {
				dispatch(userLoginFailure(resJson.message));
			}
		} else {
			dispatch(userLoginFailure("Error while connecting to the server"));
		}
	};

	const handleSocialLogin = (provider) => {
		console.log("[login/.js] handleSocialLogin() provider", provider);
		//check to see if the provider is one of facebook, google or twitter
		if ([FACEBOOK, GOOGLE, TWITTER].includes(provider)) {
			const w = window.open(
				`http://localhost:5000/api/auth/${provider}`,
				"_self"
			);
		}
	};

	const handleCreateAccount = () => {
		history.push("/create-account");
	};

	const handleForgotPassword = () => {
		history.push("/auth/forgotPassword");
	};

	const handleRouteToForgotPassword = () => {
		history.push("/forgot-password");
	};

	return (
		<View
			keepMeSignedIn={keepMeSignedIn}
			toggleKeepMeSignedIn={handleKeepMeSignedIn}
			submit={handleSubmit}
			socialLogin={handleSocialLogin}
			createAccount={handleCreateAccount}
			routeToForgotPassword={handleRouteToForgotPassword}
		/>
	);
};

export default LoginPage;
