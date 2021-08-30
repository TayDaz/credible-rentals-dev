import { Button } from "primereact/button";
import "./styles.scss";

const SuccessScreen = (props) => {
  const {
    successMessage = "Action completed successfully!",
    onClickSuccess,
    buttonLabel = "Okay",
  } = props;
  return (
    <div className='p-d-flex p-flex-column success-screen__container'>
      <div className='p-text-center'>
        <i
          className='pi pi-check-circle'
          style={{ fontSize: "5rem", color: "var(--green-500)" }}></i>
      </div>
      <div className='p-text-center p-mt-4 success-message__wrapper'>
        {successMessage}
      </div>
      <div className='p-d-flex p-jc-center p-mt-3'>
        <Button
          label={buttonLabel}
          onClick={onClickSuccess}
          className=' success-btn__wrapper'
        />
      </div>
    </div>
  );
};

export default SuccessScreen;
