import { Button } from "primereact/button";

const IsNotLoggedIn = (props) => {
  const { routeToLogin } = props;

  return (
    <div className='p-d-flex p-flex-column p-mb-2'>
      <div className='p-text-center'>
        To view the owner's details you need to be logged in
      </div>
      <div className='p-d-flex p-jc-center'>
        <Button label='Login' onClick={routeToLogin} />
      </div>
    </div>
  );
};

export default IsNotLoggedIn;
