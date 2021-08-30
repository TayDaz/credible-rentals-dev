import "./styles.scss";

const Wrapper = (props) => {
	return (
		<div className="p-grid p-justify-end p-align-center login__wrapper__container">
			<div className="p-col-12 p-sm-12 p-md-5 p-lg-5">
				<div className="p-shadow-24 children__container">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Wrapper;
