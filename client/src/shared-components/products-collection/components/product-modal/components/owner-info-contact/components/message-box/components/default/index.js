import { Button } from "primereact/button";

const Default = (props) => {
  const { onClickContact } = props;
  return (
    <div className='p-d-flex p-mt-2 p-flex-column'>
      <div className='p-d-flex p-jc-center p-text-center'>
        The owner of this add has chosen to keep its information hidden. To
        contact the owner please click on contact button and then send your
        message.
      </div>
      <div className='p-d-flex p-mt-3 p-jc-center'>
        <Button label='Contact' onClick={onClickContact} />
      </div>
    </div>
  );
};

export default Default;
