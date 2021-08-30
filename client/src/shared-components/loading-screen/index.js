import { ProgressSpinner } from "primereact/progressspinner";
import "./styles.scss";
const LoadingScreen = (props) => {
  const { loadingMessage = "Loading" } = props;

  return (
    <div className='p-d-flex p-flex-column p-jc-center p-ai-center loading-screen__container'>
      <div className='progress-spinner__wrapper'>
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth='8'
          fill='#EEEEEE'
          animationDuration='.5s'
        />
      </div>
      <div className='p-mt-4 loading-message__wrapper'>{loadingMessage}</div>
    </div>
  );
};

export default LoadingScreen;
