import parseTemplate from '../util/templateString';

function parse(content: string, obj: any) {
	if (content && typeof (content) === 'string' && (content as string).indexOf('${') > -1) {
		content = parseTemplate(content as string, obj);
	} else {
		return content;
	}
}

const print = {
	log(content: any) {
		console.log(parse(content, this));
	},
	info(content: any) {
		console.info(parse(content, this));
	},
	warn(content: any) {
		console.warn(parse(content, this));
	},
	error(content: any) {
		console.error(parse(content, this));
	}
}

export default print;

