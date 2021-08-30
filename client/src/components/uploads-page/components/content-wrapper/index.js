import "./styles.scss";

const Wrapper = (props) => {
	return (
		<>
			<div className="p-grid p-justify-center p-align-center uploads-page__content-wrapper__container">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-shadow-24 children__container">
						{props.children}
					</div>
				</div>
			</div>
		</>
	);
};

export default Wrapper;
