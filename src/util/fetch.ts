const request = function(url: string, options: any = {}) {
	const { headers = {} } = options;
	if (headers.set) {
		headers.set('X-Requested-With', 'XMLHttpRequest');
	} else {
		headers['X-Requested-With'] = 'XMLHttpRequest';
	}
	options.headers = headers;
	return fetch(url, options);
};

export default request;
