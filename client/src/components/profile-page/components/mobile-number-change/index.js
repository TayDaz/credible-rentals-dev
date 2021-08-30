import { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
	INITIATED,
	NOT_INITIATED,
	UPDATE,
	SUCCESS,
	INITIATED_EMAIL_OTP,
	INITIATED_SMS_OTP,
} from "../../../../constants";
import Initiator from "./components/initiator";
import InitiatedEmailOtp from "./components/initiated-email-otp";
import Update from "./components/update";
import InitiatedSmsOtp from "./components/initiated-sms-otp";
import Success from "./components/success";

const viewMap = {
	[NOT_INITIATED]: Initiator,
	[INITIATED_EMAIL_OTP]: InitiatedEmailOtp,
	[UPDATE]: Update,
	[INITIATED_SMS_OTP]: InitiatedSmsOtp,
	[SUCCESS]: Success,
};

const ChangeMobileNumber = (props) => {
	const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

	const { showDialog } = props;
	const mobileNumberChangeStatus = props.mobileNumberChangeStatus;
	const view = mobileNumberChangeStatus || NOT_INITIATED;

	const showConfirmDialog = () => {
		setIsConfirmDialogVisible(true);
	};

	const handleConfirmDialogAccept = () => {
		props.cancelMobileNumberChange();
	};

	const handleConfirmDialogReject = () => {
		setIsConfirmDialogVisible(false);
	};

	const cancelMobileNumberChange = () => {
		if (
			[INITIATED_EMAIL_OTP, UPDATE, INITIATED_SMS_OTP].includes(
				mobileNumberChangeStatus
			)
		) {
			showConfirmDialog();
		} else {
			props.cancelMobileNumberChange();
		}
	};

	const renderFooter = (name) => {
		return (
			<div>
				<Button
					label="Cancel"
					icon="pi pi-times"
					onClick={cancelMobileNumberChange}
					className="p-button-text"
				/>
			</div>
		);
	};

	const Screen = viewMap[view];

	return (
		<Dialog
			header="Mobile Number Change"
			visible={showDialog}
			onHide={cancelMobileNumberChange}
			breakpoints={{ "960px": "75vw" }}
			style={{ width: "50vw" }}
			footer={renderFooter("displayResponsive")}
		>
			<ConfirmDialog
				visible={isConfirmDialogVisible}
				onHide={() => setIsConfirmDialogVisible(false)}
				message="Are you sure you want to Cancel?"
				header="Confirmation"
				icon="pi pi-info-circle"
				accept={handleConfirmDialogAccept}
				reject={handleConfirmDialogReject}
				// acceptIcon=""
				// rejectIcon=""
				acceptClassName="p-button-danger"
			/>
			<Screen {...props} />
		</Dialog>
	);
};

export default ChangeMobileNumber;
