/**
 * 解析字符串模板
 * @param content 内容
 * @param obj 数据对象，content 中用到的表达式从数据对象中取
 */
function parseTemplate(content: string, obj?: any) {
    if (!content || !obj) {
        return content;
    }
    // 引用模板字符串
    let funcStr = 'return ' + '`' + content + '`';
    const regex = /\$\{(.*?)\}/g;
    let result = content.match(regex) || [];
    var paramsName: string[] = [];
    result.forEach((item, index) => {
        item = item.substring(2, item.length - 1);
        paramsName.push(item);
    });
    var params: any[] = [];
    paramsName.forEach((name, index) => {
        params.push(obj[name]);
    })
    var func = new Function(...paramsName, funcStr);
    return func(...params);
}

export default parseTemplate; 