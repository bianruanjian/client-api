import fetch from '../util/fetch';
import { ResponseInfo } from '../interface';

export interface Params {
	[index: string]: any;
}

export interface RequestInterface {
	url: string;
	method?: string;
	data?: Params;
	done?: (data: any, status: number, response: Response) => void;
	fail?: (data: any, status: number, response: Response) => void;
}

export type RequestMethodType = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS';

function _parse(config: RequestInterface) {
	const method = config.method || 'GET';
	let result = {
		params: '',
		done: config.done || defaultDone,
		fail: config.fail || defaultFail,
		options: {
			method
		}
	};
	// 注意 GET 或 HEAD 方法的请求不能包含 body 信息。
	if (method === 'GET' || method === 'HEAD') {
		_parseGet(config, result);
	} else {
		_parsePost(config, result);
	}
	return result;
}

function _parseGet(config: RequestInterface, result: any) {
	// config.options.credentials = 'include'; // 携带 cookie
	// config.options.mode = "cors"; // 允许跨域
	if (!config.data) {
		return;
	}
	let i = 0;
	for (var key in config.data) {
		if (i === 0) {
			result.params += '?' + key + '=' + config.data[key];
		} else {
			result.params += '&' + key + '=' + config.data[key];
		}
		i++;
	}
}

function _parsePost(config: RequestInterface, result: any) {
	result.options.credentials = 'same-origin';
	result.options.headers = { 'Content-type': 'application/json;charset=UTF-8' };
	result.options.body = JSON.stringify(config.data);
}

function defaultDone(data: any, status: number, responseInfo: Response) { }

function defaultFail(data: any, status: number, responseInfo: Response) { }

async function doRequest(url: string, cfg: any) {
	return fetch(url + cfg.params, {
		...cfg.options
	});
}
/**
 * 基于 fetch 的请求组件
 * @param config 
 */
export default function request(config: RequestInterface) {
	const { url = '', done = defaultDone, fail = defaultFail } = config;
	if (!url) {
		return false;
	}
	let cfg = _parse(config);
	doRequest(url, cfg).then(async (response) => {
		// TODO 需要根据数据类型做处理
		const responseInfo: ResponseInfo = await response.json();
		done && done(responseInfo.data, responseInfo.status, response);
	}, (error) => {
		if (error.stack) {
			fail && fail(error.message, error.status, error);
		} else {
			fail && fail(error.data, error.status, error);
		}
	});
	return true;
}
