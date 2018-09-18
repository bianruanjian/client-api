import parseTemplate from '../util/templateString';

function _parse(content: string, obj: any) {
	if (content && typeof (content) === 'string' && (content as string).indexOf('${') > -1) {
		return parseTemplate(content as string, obj);
	} else {
		return content;
	}
}

/**
 * 基于 javascript 的 console 的消息打印组件
 */
const print = {
	log(content: any) {
		console.log(_parse(content, this));
	},
	info(content: any) {
		console.info(_parse(content, this));
	},
	warn(content: any) {
		console.warn(_parse(content, this));
	},
	error(content: any) {
		console.error(_parse(content, this));
	}
}

export default print;

