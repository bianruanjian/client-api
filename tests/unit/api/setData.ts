import { describe, it, beforeEach } from "intern/lib/interfaces/bdd";
import { Store } from '@dojo/framework/stores/Store';
import global from '@dojo/shim/global';
import setData from '../../../src/api/setData';
import { StateData } from '../../../src/interface';
import { OperationType } from '@dojo/framework/stores/state/Patch';
import { Pointer } from '@dojo/framework/stores/state/Pointer';

const { assert } = intern.getPlugin('chai');

function storeAdd(path: string, value: any) {
    global.store.apply([
        { op: OperationType.ADD, path: new Pointer(path), value: value }
    ], true);
}

describe('setData', () => {
    let store: Store<any>;
    let stateData: StateData;
    beforeEach(() => {
        store = global.store = new Store();
    })

    it('without global store should throw an error', () => {
        global.store = null;
        stateData = {
            foo: 'test'
        };
        assert.throws(() => { setData(stateData) }, Error, '未找到 store，请设置 global.store');
    })

    it('add foo', () => {
        stateData = {
            foo: 'test'
        };
        setData(stateData);
        assert.strictEqual(store.get(store.path('foo')), 'test');
    })


    it('add two objects', () => {
        stateData = {
            'foo': 'test1',
            'bar': 'test2'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), 'test1');
        assert.strictEqual(store.get(store.path('bar')), 'test2');
    })

    it('add foo.bar', () => {
        stateData = {
            'foo.bar': 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), { bar: 'test' });
        assert.strictEqual(store.get(store.path('foo/bar')), 'test');
    })

    it('add foo.bar.a', () => {
        stateData = {
            'foo.bar.a': 'test'
        };
        setData(stateData);
        assert.strictEqual(store.get(store.path('foo/bar/a')), 'test');
    })

    it('add foo[2].bar', () => {
        stateData = {
            'foo[2].bar': 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), [, , { bar: 'test' }]);
        assert.strictEqual(store.get(store.path('foo/2/bar')), 'test');
    })

    it("add foo[0]['bar'] with single quotes", () => {
        stateData = {
            "foo[0]['bar']": 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), [{ bar: 'test' }]);
        assert.strictEqual(store.get(store.path('foo/0/bar')), 'test');
    })

    it('add foo[0]["bar"] with double quotes', () => {
        stateData = {
            'foo[0]["bar"]': 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), [{ bar: 'test' }]);
        assert.strictEqual(store.get(store.path('foo/0/bar')), 'test');
    })


    it('update foo.bar', () => {
        storeAdd('foo.bar', 'test1');
        stateData = {
            'foo.bar': 'test2'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), { bar: 'test2' });
        assert.strictEqual(store.get(store.path('foo/bar')), 'test2');
    })
})