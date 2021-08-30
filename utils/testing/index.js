const asyncLoad = () =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			// throw Error();
			resolve(new Error("This is an Error"));
		}, 3000);
	});

const check = async () => {
	const resp = await asyncLoad().catch((err) =>
		console.log("Error from .catch()", err)
	);

	console.log("resp", resp);
};

check();
