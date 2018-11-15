import { processExecutor } from '@dojo/framework/stores/process';
import { Store } from '@dojo/framework/stores/Store';
import { PatchOperation } from '@dojo/framework/stores/state/Patch';
import { replace } from '@dojo/framework/stores/state/operations';
import global from '@dojo/framework/shim/global';
import { StateData } from '../interface';

// 转换字符串为数据路径：
// 1. a.b  -> /a/b
// 2. array[1].a.b -> /array/1/a/b
// 3. array[1]['a'] 或 array[1]["a"] -> /array/1/a
function _getPath(name: string) {
    let path = name.replace(/\./g, '/').replace(/"/g, '').replace(/'/g, '').replace(/\[/g, '/').replace(/\]/g, '');
    if (path.indexOf('\/') != 0) {
        path = '/' + path;
    }
    return path;
}

function _getStore(): Store {
    return global.store;
}

/**
 * 用于更新 store 中的值
 * @param data json 对象
 */
export default function setData(data: StateData) {
    if (!data) {
        return;
    }
    const store: Store = _getStore();
    if (!store) {
        throw Error('未找到 store，请设置 global.store');
    }
    const { path } = store;
    const operations: PatchOperation[] = [];
    Object.keys(data).forEach((key) => {
        operations.push(replace(path(_getPath(key)), data[key]));
    });
    processExecutor('set-data-process', [() => operations], store, undefined, undefined)({});
}
