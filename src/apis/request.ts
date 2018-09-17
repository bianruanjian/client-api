import _request from '../util/fetch';

export interface Params {
	[index: string]: any;
}

export interface RequestInterface {
	url: string;
	method?: string;
	data?: Params;
	done?: (payload: { response: any }) => void;
	fail?: (payload: { err: any }) => void;
}

export type RequestMethodType = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS';

function _parse(config: any) {
	const method = config.method;
	// 注意 GET 或 HEAD 方法的请求不能包含 body 信息。
	if (method === 'GET' || method === 'HEAD') {
		_parseGet(config);
	} else {
		_parsePost(config);
	}
}

function _parseGet(config: any) {
	config.options.credentials = 'include';
	let i = 0;
	for (var key in config.data) {
		if (i === 0) {
			config.params += '?' + key + '=' + config.data[key];
		} else {
			config.params += '&' + key + '=' + config.data[key];
		}
		i++;
	}
}

function _parsePost(config: any) {
	config.options.credentials = 'same-origin';
	config.options.headers = { 'Content-type': 'application/json;charset=UTF-8' };
	let jsonData: any = {};
	for (var key in config.data) {
		jsonData[key] = config.data[key];
	}
	config.options.body = JSON.stringify(jsonData);
}

export default function request(config: RequestInterface) {
	const { url = '', method = 'GET', data = {}, done = () => { }, fail = () => { } } = config;
	if (!url) {
		return false;
	}
	let params = '';
	let cfg = {
		params,
		data,
		options: {
			method
		}
	};
	_parse(cfg);
	_request(url + cfg.params, {
		...cfg.options
	}).then(function (response) {
		done && done(response as any);
	}, function (error) {
		fail && fail(error as any);
	});
	return true;
}
