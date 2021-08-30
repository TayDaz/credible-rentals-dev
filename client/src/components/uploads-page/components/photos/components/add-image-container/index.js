import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import { Badge } from "primereact/badge";
import "./styles.scss";

const readFile = (file) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener(
			"load",
			() => {
				const imageElement = document.createElement("img");
				imageElement.src = reader.result;

				imageElement.addEventListener(
					"load",
					(e) => {
						const canvas = document.createElement("canvas");

						const MAX_WIDTH = 700;
						const scaleSize = MAX_WIDTH / e.target.width;

						canvas.width = MAX_WIDTH;
						canvas.height = e.target.height * scaleSize;

						const ctx = canvas.getContext("2d");
						ctx.drawImage(
							e.target,
							0,
							0,
							canvas.width,
							canvas.height
						);

						const srcEncoded = ctx.canvas.toDataURL(
							e.target,
							"image/jpeg"
						);

						resolve(srcEncoded);
					},
					false
				);
			},
			false
		);
		reader.readAsDataURL(file);
	});
};

const AddImageContainer = (props) => {
	const [showDialog, setShowDialog] = useState(false);
	const [imageSrc, setImageSrc] = useState(props.src || null);
	const [imageTitle, setImageTitle] = useState(props.title || "");
	console.log("[add-image-container/.js] props", props);

	const handleShowDialog = () => {
		setShowDialog(true);
	};

	const handleHideDialog = () => {
		setShowDialog(false);
		console.log(
			"[add-image-container/.js] handleHideDialog() showDialog",
			showDialog
		);
		// setImageSrc(null);
	};

	const onFileChange = async (e) => {
		if (e.files && e.files.length > 0) {
			const file = e.files[0];
			let imageDataUrl = await readFile(file);

			// // apply rotation if needed
			// const orientation = await getOrientation(file)
			// const rotation = ORIENTATION_TO_ANGLE[orientation]
			// if (rotation) {
			// 	imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
			// }

			setImageSrc(imageDataUrl);
		}
	};

	const handleDeleteImage = () => {
		setShowDialog(false);
		setImageSrc(null);
		setImageTitle("");
		props.deleteImage(props.indx);
	};

	const updateImageTitle = (e) => {
		setImageTitle(e.target.value);
	};

	const addImageToListAndContinue = () => {
		props.addImage(imageSrc, imageTitle);
		setImageSrc(null);
	};

	const addImageToListAndClose = () => {
		props.addImage(imageSrc, imageTitle);
		setImageSrc(null);
		setImageTitle("");
		setShowDialog(false);
	};

	const DialogHeader = (props) => {
		if (!imageSrc) {
			return (
				<div className="add-photo-container__dialog-header__container">
					Choose an image
				</div>
			);
		} else {
			return (
				<div className="add-photo-container__dialog-header__container">
					<FileUpload
						mode="basic"
						name="demo[]"
						onSelect={onFileChange}
						accept="image/*"
						maxFileSize={1000000}
					/>
				</div>
			);
		}
	};

	const DialogBody = (props) => {
		if (!imageSrc) {
			return (
				<div className="add-photo-container__dialog-body__container">
					<FileUpload
						mode="basic"
						name="demo[]"
						onSelect={onFileChange}
						accept="image/*"
						maxFileSize={1000000}
					/>
				</div>
			);
		} else {
			return (
				<div className="add-photo-container__dialog-body__container">
					<InputText
						value={imageTitle}
						onChange={updateImageTitle}
						className="image-title"
						placeholder="Image title"
						autoFocus
					/>
					<img
						src={imageSrc}
						alt="Uploaded Image"
						className="image-preview"
					/>
				</div>
			);
		}
	};

	const DialogFooter = (props) => {
		if (!imageSrc) {
			return (
				<div className="add-photo-container__dialog-footer__container">
					<Button label="Cancel" onClick={handleHideDialog} />
				</div>
			);
		} else {
			return (
				<div className="add-photo-container__dialog-footer__container">
					<Button
						label="Add More"
						icon="pi pi-plus"
						onClick={addImageToListAndContinue}
					/>
					<Button
						label="Save"
						icon="pi pi-save"
						onClick={addImageToListAndClose}
					/>
				</div>
			);
		}
	};

	return (
		<>
			{props.indx >= 0 && props.src ? (
				<div className="p-col-10 p-md-4 p-lg-4 photos__add-photo__preview__container">
					<img
						src={props.src}
						className="preview-image__container"
						onClick={handleShowDialog}
					/>

					<Button
						icon="pi pi-times"
						className="p-button-rounded p-button-danger p-button-sm photo-delete-icon"
						onClick={handleDeleteImage}
					/>
				</div>
			) : (
				<div
					className="p-col-10 p-md-4 p-lg-4 photos__add-photo__container"
					onClick={handleShowDialog}
				>
					<i
						className="pi pi-plus"
						style={{
							fontSize: "50px",
							color: "var(--primary-color)",
						}}
					></i>
				</div>
			)}

			<Dialog
				header={<DialogHeader />}
				footer={<DialogFooter />}
				visible={showDialog}
				onHide={handleHideDialog}
				breakpoints={{ "960px": "75vw" }}
				style={{
					width: "50vw",
				}}
				closable
			>
				<DialogBody />
			</Dialog>
		</>
	);
};

export default AddImageContainer;
