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
} from "../../../../constants";
import Initiator from "./components/initiator";
import Initiated from "./components/initiated";
import Update from "./components/update";
import Success from "./components/success";

const viewMap = {
	[NOT_INITIATED]: Initiator,
	[INITIATED]: Initiated,
	[UPDATE]: Update,
	[SUCCESS]: Success,
};

const ChangePassword = (props) => {
	const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

	const { showDialog } = props;
	const passwordChangeStatus = props.passwordChangeStatus;
	const view = passwordChangeStatus || NOT_INITIATED;

	const showConfirmDialog = () => {
		setIsConfirmDialogVisible(true);
	};

	const handleConfirmDialogAccept = () => {
		props.cancelPasswordChange();
	};

	const handleConfirmDialogReject = () => {
		setIsConfirmDialogVisible(false);
	};

	const cancelPasswordChange = () => {
		if ([INITIATED, UPDATE].includes(passwordChangeStatus)) {
			showConfirmDialog();
		} else {
			props.cancelPasswordChange();
		}
	};

	const renderFooter = (name) => {
		return (
			<div>
				<Button
					label="Cancel"
					icon="pi pi-times"
					onClick={cancelPasswordChange}
					className="p-button-text"
				/>
			</div>
		);
	};

	const Screen = viewMap[view];

	return (
		<Dialog
			header="Password Change"
			visible={showDialog}
			onHide={cancelPasswordChange}
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

export default ChangePassword;
