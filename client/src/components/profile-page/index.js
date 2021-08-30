import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../../constants";

import {
	profileUpdateUserInfo,
	profileChangeUserPassword,
	profileChangeUserMobileNumber,
	profileUpdateAvatar,
	profileClearData,
} from "../../redux";
import View from "./view";

const ProfilePage = (props) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const profile = useSelector((state) => state.profile);
	const passwordChangeStatus = profile.data?.passwordChangeStatus;
	const token = user.data?.token;

	const handleUpdateAvatar = async (value) => {
		console.log("avatar ", value);
		const blob = await fetch(value).then((data) => data.blob());
		const formData = new FormData();
		formData.append("avatar", blob);
		dispatch(profileUpdateAvatar(formData, token));
	};

	const handleUpdateUserInfo = (value) => {
		console.log("[profile-page/.js] handleUpdateUserInfo value", value);
		dispatch(profileUpdateUserInfo(value, token));
	};

	const handleSubmitPasswordChange = (value) => {
		console.log("[profile-page/.js] handlePasswordChange value", value);

		dispatch(profileChangeUserPassword(value, token));
	};

	const handleSubmitMobileNumberChange = (value) => {
		console.log("[profile-page/.js] handleMobileNumberChange value", value);

		dispatch(profileChangeUserMobileNumber(value, token));
	};

	const handleCancelPasswordChange = () => {
		dispatch(profileClearData());
	};

	const handleCancelMobileNumberChange = () => {
		dispatch(profileClearData());
	};

	return (
		<View
			updateAvatar={handleUpdateAvatar}
			updateUserInfo={handleUpdateUserInfo}
			submitPasswordChange={handleSubmitPasswordChange}
			cancelPasswordChange={handleCancelPasswordChange}
			submitMobileNumberChange={handleSubmitMobileNumberChange}
			cancelMobileNumberChange={handleCancelMobileNumberChange}
		/>
	);
};

export default ProfilePage;
