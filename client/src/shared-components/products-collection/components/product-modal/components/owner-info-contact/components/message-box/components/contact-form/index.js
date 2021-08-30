import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { deleteMessageNotification } from "../../../../../../../../../../redux";

const ContactForm = (props) => {
  const { product, sendMessageToOwner, onClickCancel } = props;

  console.log("Contact form", props);

  const isSendingMessage = product?.isSendingMessage;
  const isMessageSentSuccess = product?.isMessageSentSuccess;
  const isError = product?.isError;

  useEffect(() => {
    setMessage("");
  }, [isMessageSentSuccess]);

  const [message, setMessage] = useState("");

  const handleOnClickSend = () => {
    if (message.length > 0) {
      setMessage("");
      sendMessageToOwner(product, message);
    }
  };

  const getScreen = () => {
    if (isSendingMessage) {
      return <Loading />;
    } else if (!isSendingMessage && isMessageSentSuccess) {
      return <Success {...props} />;
    } else {
      return (
        <>
          <p>Please enter your message below</p>
          <InputTextarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            // cols={60}
            autoResize
          />
          <div className='p-d-flex p-jc-between p-mt-2 btn__wrapper'>
            <Button label='Cancel' onClick={onClickCancel} />
            <Button label='Send' onClick={handleOnClickSend} />
          </div>
        </>
      );
    }
  };

  return (
    <div className='p-d-flex p-mb-2 p-flex-column contact-form__container'>
      {getScreen()}
    </div>
  );
};

const Loading = (props) => {
  return (
    <div className='p-d-flex p-flex-column p-jc-center p-ai-center loading-screen__wrapper'>
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth='8'
        fill='#EEEEEE'
        animationDuration='.5s'
      />
      <span className='p-text-center'> Sending Message...</span>
    </div>
  );
};

const Success = (props) => {
  const { product, deleteMessageNotification } = props;

  const handleDeleteMessageNotofication = () => {
    deleteMessageNotification(product);
  };

  return (
    <div className='p-d-flex p-flex-column'>
      <div className='p-text-center'>
        <i
          className='pi pi-check-circle'
          style={{ fontSize: "5rem", color: "var(--green-500)" }}></i>
      </div>
      <div className='p-text-center'>Message Sent successfully</div>
      <div className='p-d-flex p-jc-center'>
        <Button label='Dismiss' onClick={handleDeleteMessageNotofication} />
      </div>
    </div>
  );
};

export default ContactForm;
