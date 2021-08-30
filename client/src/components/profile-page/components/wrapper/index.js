import "./styles.scss";

const Wrapper = (props) => {
	return (
		<div className="p-fluid p-grid p-justify-center p-align-center profile-page__wrapper">
			<div className="p-shadow-24 p-col-12 p-md-8 p-lg-8 children__container">
				{props.children}
			</div>
		</div>
	);
};

export default Wrapper;
