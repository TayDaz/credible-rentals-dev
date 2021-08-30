import { useState } from "react";
import Headers from "../headers";
import Sidebar from "../../shared-components/sidebar";

import "./styles.scss";

const View = (props) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [view, setView] = useState(DEFAULT);

	return (
		<>
			<Headers />
			<div className="p-grid home-page__wrapper">
				<Sidebar isOpen={isSidebarOpen} />
				<div className="p-col content__container">
					<div className="p-grid">
						<div className="p-col-12 p-md-12 p-mb-2 container--child">
							<div className="p-grid">
								<div className="p-col-12">Item1</div>
							</div>
						</div>
						<div className="p-col-8 container--child">Col 1</div>
						<div className="p-col container--child">Col 1</div>
						<div className="p-col container--child">Col 1</div>
						<div className="p-col container--child">Col 1</div>
						<div className="p-col container--child">Col 1</div>
						<div className="p-col container--child">Col 1</div>
						<div className="p-col container--child">Col 1</div>
						<div className="p-col p-mb-4 container--child">
							Col 1
						</div>
						<div className="p-col-6 p-ml-2 container--child">
							Col 1
						</div>
						<div className="p-col-6 container--child">Col 1</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							<div className="p-grid">
								<div className=""></div>
							</div>
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
						<div className="p-col-12 p-mb-3 container--child">
							Col 1
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default View;
