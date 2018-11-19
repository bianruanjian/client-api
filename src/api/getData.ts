import { Store } from '@dojo/framework/stores/Store';
import global from '@dojo/framework/shim/global';

// 转换字符串为数据路径：
// 1. a.b  -> /a/b
// 2. array[1].a.b  -> /array/1/a/b
// 3. array[1]['a'] -> /array/1/a
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
 * getData 用于从 store 中取出数据
 * @param keyPath 数据路径
 */
export default function getData(keyPath: string) {
    if (!keyPath) {
        return;
    }
    const store: Store = _getStore();
    if (!store) {
        throw Error('未找到 store，请设置 global.store');
    }
    const { get, path } = store;
    const dataPath = _getPath(keyPath);
    return get(path(dataPath));
}
