import { useEffect, useState } from "react";
import Default from "./components/default";
import ContactForm from "./components/contact-form";
import "./styles.scss";
import { Button } from "primereact/button";

const MessageBox = (props) => {
  // const { product } = props;
  useEffect(() => {
    if (props.product._id !== product._id) {
      setProduct(props.product);
      setIsContacting(false);
    }
  }, [props.product]);

  const [product, setProduct] = useState(props.product);
  const [isContacting, setIsContacting] = useState(false);

  const handleOnClickContact = () => {
    setIsContacting(true);
  };

  const handleOnClickCancel = () => {
    setIsContacting(false);
  };

  return (
    <div className='p-mb-2'>
      {isContacting ? (
        <ContactForm
          onClickContact={handleOnClickContact}
          onClickCancel={handleOnClickCancel}
          {...props}
        />
      ) : (
        <Default onClickContact={handleOnClickContact} />
      )}
    </div>
  );
};

export default MessageBox;
