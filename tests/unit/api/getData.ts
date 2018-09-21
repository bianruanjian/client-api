import { describe, it, beforeEach } from "intern/lib/interfaces/bdd";
const { assert } = intern.getPlugin('chai');
import { Store } from '@dojo/framework/stores/Store';
import global from '@dojo/shim/global';
import getData from '../../../src/api/getData';
import { OperationType } from '@dojo/framework/stores/state/Patch';
import { Pointer } from '@dojo/framework/stores/state/Pointer';

function storeAdd(path: string, value: any) {
    global.store.apply([
        { op: OperationType.ADD, path: new Pointer(path), value: value }
    ], true);
}

describe('getData', () => {
    beforeEach(() => {
        global.store = new Store();
    })

    it('without global store should throw an error', () => {
        global.store = null;
        assert.throws(() => { getData('foo') }, Error, '未找到 store，请设置 global.store');
    })

    it('get foo', () => {
        storeAdd('foo', 'foo');
        assert.strictEqual(getData('foo'), 'foo');
    })

    it('get foo.bar', () => {
        storeAdd('foo/bar', 'foo');
        assert.strictEqual(getData('foo.bar'), 'foo');
    })

    it('get foo[bar]', () => {
        storeAdd('foo/bar', 'foo');
        assert.strictEqual(getData('foo[bar]'), 'foo');
    })

    it('get foo[1]/bar', () => {
        storeAdd('foo/1/bar', 'foo');
        assert.strictEqual(getData('foo[0]/bar'), undefined);
        assert.strictEqual(getData('foo[1]/bar'), 'foo');
    })

})