import { CATEGORY, DATE, SUB_CATEGORY } from "../../../../constants";

export const getFilteredAdds = (filter, adds) => {
	console.log("getFilteredAdds(filter, adds) adds", adds);
	let filteredAdds = {},
		filterVal;

	for (const add of adds) {
		switch (filter) {
			case DATE:
				filterVal = add.createdAt.split("T")[0];
				break;

			case CATEGORY:
				filterVal = add.category;
				break;

			case SUB_CATEGORY:
				filterVal = add.subCategory;
		}

		if (!filteredAdds.hasOwnProperty(filterVal)) {
			filteredAdds[filterVal] = [];
		}

		filteredAdds[filterVal] = [...filteredAdds[filterVal], add];
	}

	// filteredAdds = {};

	let sortedAdds = Object.entries(filteredAdds).map(
		([filterIdentifier, adds]) => ({ [filterIdentifier]: adds })
	);

	const mappedAdds = new Map();

	console.log("SORTED_ADDS", sortedAdds);
	sortedAdds.forEach((obj) => {
		Object.entries(obj).forEach(([filterIdentifier, adds]) => {
			console.log("MAPPED KEY, value", filterIdentifier, adds);
			mappedAdds.set(filterIdentifier, adds);
		});
	});

	return mappedAdds;
};
