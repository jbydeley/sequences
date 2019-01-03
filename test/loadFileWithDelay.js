async function delay(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

async function loadFileWithDelay(filename) {
	const element = await SirenFixture.load(filename, fixture('RouterFixture'));

	await delay(250);

	return element;
}

window.loadFileWithDelay = loadFileWithDelay;
