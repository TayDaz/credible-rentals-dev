import HeaderTop from "../../../header-top";
import "./styles.scss";

const Wrapper = (props) => {
	return (
		<>
			<div className="p-grid p-justify-center  create-account__wrapper__container">
				<div className="p-col-12 p-md-8 p-lg-6">
					<div className="p-shadow-24 children__container">
						{props.children}
					</div>
				</div>
			</div>
		</>
	);
};

export default Wrapper;
