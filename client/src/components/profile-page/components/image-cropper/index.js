import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
// import Slider from "@material-ui/core/Slider";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import getCroppedImg from "./crop-image";

const readFile = (file) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(reader.result), false);
		reader.readAsDataURL(file);
	});
};

const ImageCropper = (props) => {
	const [avatar, setAvatar] = useState(props.src);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);

	const { showModal } = props;

	// const [showModal, setShowModal] = useState(false);

	// const toggleShowModal = () => {
	// 	setShowModal(!showModal);
	// };

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				avatar,
				croppedAreaPixels,
				rotation
			);
			console.log("donee", { croppedImage });
			props.saveCroppedImage(croppedImage);
			// toggleShowModal();
			props.hideDialog();
		} catch (e) {
			console.error(e);
		}
	}, [croppedAreaPixels, rotation]);

	const onClose = useCallback(() => {
		setCroppedImage(null);
		// setShowModal(false);
		props.hideDialog();
	}, []);

	const renderFooter = (name) => {
		return (
			<div>
				<Button
					label="Cancel"
					icon="pi pi-times"
					onClick={onClose}
					className="p-button-text"
				/>
				<Button
					label="Save"
					icon="pi pi-check"
					onClick={showCroppedImage}
					autoFocus
				/>
			</div>
		);
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

			setAvatar(imageDataUrl);
		}
	};

	return (
		<div>
			{/* <Button
					label="Show"
					icon="pi pi-external-link"
					onClick={toggleShowModal}
				/> */}
			<Dialog
				visible={props.isDialogVisible}
				// style={{ width: "50vw" }}
				header="Edit Avatar"
				footer={renderFooter("displayBasic")}
				onHide={props.hideDialog}
			>
				<div
					className="p-fluid p-grid p-jc-center p-mb-3 p-mt-2"
					// style={{ border: "1px solid black" }}
				>
					<div>
						<FileUpload
							name="demo[]"
							mode="basic"
							accept="image/*"
							onSelect={onFileChange}
						/>
					</div>
				</div>
				<div className="p-fluid p-grid p-justify-center">
					<div
						className="p-col-12"
						style={{
							position: "relative",
							height: "200px",
							padding: "10px",
						}}
					>
						<Cropper
							image={avatar}
							crop={crop}
							rotation={rotation}
							zoom={zoom}
							cropShape="round"
							aspect={1}
							onCropChange={setCrop}
							onRotationChange={setRotation}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
						/>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default ImageCropper;

///old code
/* <div className={classes.controls}>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: classes.slider }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ root: classes.slider }}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Show Result
        </Button>
      </div>
      <ImgDialog img={croppedImage} onClose={onClose} /> */
