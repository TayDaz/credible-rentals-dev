import "./styles.scss";

const MainContentWrapper = (props) => {
  return <div className='p-col main-content-wrapper'>{props.children}</div>;
};

export default MainContentWrapper;
