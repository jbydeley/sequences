import SirenFixture from 'polymer-siren-test-helpers';

async function delay(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}

export default async function loadFileWithDelay(filename) {
	const element = await SirenFixture(filename, fixture('RouterFixture'));

	await delay(250);

	return element;
}
