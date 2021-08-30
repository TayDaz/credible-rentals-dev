import { useState } from "react";
import { useSelector } from "react-redux";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

// import Header from "../header";
import Headers from "../headers";
import Avatar from "./components/avatar";
import UserInfoForm from "./components/user-info-form";
import PasswordChange from "./components/password-change";
import MobileNumberChange from "./components/mobile-number-change";
import Wrapper from "./components/wrapper";
import url from "../../config/url";
import defaultAvatarJpg from "./assets/images/portfolio.png";
import { LOCAL, PROFILE_PAGE } from "../../constants";
import "./styles.scss";

const View = (props) => {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const passwordChangeStatus = profile.data?.passwordChangeStatus;
  const mobileNumberChangeStatus = profile.data?.mobileNumberChangeStatus;

  const userInfoFormProps = {
    firstName: user.data?.firstName,
    lastName: user.data?.lastName,
    username:
      user.data?.provider === LOCAL
        ? user.data?.username
        : user.data?.provider?.toUpperCase(),
    mobileNumber: user.data?.mobileNumber,
    email: user.data?.email,
    residenceAddress: user.data?.residenceAddress,
    updateUserInfo: props.updateUserInfo,
  };

  const [
    isMobileNumberChangeDialogVisible,
    setIsMobileNumberChangeDialogVisible,
  ] = useState(false);
  const [isChangePasswordDialogVisible, setChangePasswordDialogVisible] =
    useState(false);

  const handleUpdateAvatar = (src) => {
    props.updateAvatar(src);
  };

  const showChangePasswordDialog = () => {
    setChangePasswordDialogVisible(true);
  };

  const showMobileNumberChangeDialog = () => {
    setIsMobileNumberChangeDialogVisible(true);
  };

  const handleCancelPasswordChange = () => {
    setChangePasswordDialogVisible(false);
    if (passwordChangeStatus) {
      props.cancelPasswordChange();
    }
  };

  const handleSubmitPasswordChange = (data) => {
    // console.log(
    // 	"[profile-page/view.js] handleSubmitPasswordChange data",
    // 	data
    // );
    props.submitPasswordChange(data);
  };

  const handleCancelMobileNumberChange = () => {
    setIsMobileNumberChangeDialogVisible(false);
    if (mobileNumberChangeStatus) {
      props.cancelMobileNumberChange();
    }
  };

  const handleSubmitMobileNumberChange = (data) => {
    // console.log(
    // 	"[profile-page/view.js] handleSubmitPasswordChange data",
    // 	data
    // );
    props.submitMobileNumberChange(data);
  };

  let imgSrc;

  if (!user.data?.avatar) {
    imgSrc = defaultAvatarJpg;
  } else {
    if (user.data?.avatar?.includes("http")) {
      imgSrc = user.avatar;
    } else {
      imgSrc = `${url.image}/${user.data?.avatar}`;
    }
  }

  return (
    <>
      <Headers currentPage={PROFILE_PAGE} />
      <Wrapper>
        <div className='p-fluid p-grid p-justify-center  profile-page__avatar__parent-wrapper'>
          <div className='p-col-12 profile-page__avatar__wrapper'>
            <Avatar src={imgSrc} updateAvatar={handleUpdateAvatar} />
          </div>
        </div>
        <div style={{ marginTop: "120px" }}></div>

        <div className='p-fluid p-grid p-formgrid'>
          <UserInfoForm {...userInfoFormProps} />
          <Divider layout='vertical' className='p-d-none p-d-md-inline' />
          <Divider className='p-d-md-none p-d-lg-none' />
          <div className='p-col-12 p-md-3 p-lg-3 p-d-flex p-flex-column p-jc-center'>
            <div className='p-mb-2'>
              <Button
                label='Change Password'
                onClick={showChangePasswordDialog}
              />
              <PasswordChange
                showDialog={isChangePasswordDialogVisible}
                passwordChangeStatus={passwordChangeStatus}
                cancelPasswordChange={handleCancelPasswordChange}
                submitPasswordChange={handleSubmitPasswordChange}
                email={user.data?.email || "random@random.com"}
              />
            </div>
            <div className=''>
              <Button
                label='Change Mobile Number'
                onClick={showMobileNumberChangeDialog}
              />
              <MobileNumberChange
                showDialog={isMobileNumberChangeDialogVisible}
                mobileNumberChangeStatus={mobileNumberChangeStatus}
                cancelMobileNumberChange={handleCancelMobileNumberChange}
                submitMobileNumberChange={handleSubmitMobileNumberChange}
                email={user.data?.email || "random@random.com"}
                newMobileNumber={
                  profile.data?.newMobileNumber || "919090909090"
                }
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default View;
