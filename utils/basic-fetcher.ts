export const basicFetcher = (url: string) =>
	fetch(url).then((res) => res.json());
