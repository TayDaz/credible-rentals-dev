import { Button } from "primereact/button";
import "./styles.scss";

const ErrorScreen = (props) => {
  const {
    errorMessage = "An error has occurred!",
    onClickError = () => null,
    buttonLabel = "Okay",
  } = props;
  return (
    <div className='p-d-flex p-flex-column error-screen__container'>
      <div className='p-text-center'>
        <i
          className='pi pi-check-circle'
          style={{ fontSize: "5rem", color: "var(--green-500)" }}></i>
      </div>
      <div className='error-message__wrapper'>{errorMessage}</div>
      <div className='p-d-flex p-jc-center p-mt-3'>
        <Button
          label={buttonLabel}
          onClick={onClickError}
          className='error-btn__wrapper'
        />
      </div>
    </div>
  );
};

export default ErrorScreen;
